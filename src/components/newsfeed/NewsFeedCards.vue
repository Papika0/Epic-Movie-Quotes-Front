<template>
  <div
    v-for="(quote, index) in visibleQuotes"
    :key="'quote-' + index"
    class="bg-neutral-900 rounded-xl flex flex-col gap-6 px-6"
  >
    <div class="inline-flex gap-4 mt-6">
      <img
        class="w-52px h-52px rounded-full"
        :src="profileImage(quote.user.thumbnail)"
        v-if="quote.user.thumbnail"
      />
      <div class="w-52px h-52px rounded-full bg-red-800" v-else>
        <p class="text-white text-xl font-normal leading-loose my-auto">
          {{ quote.user.username[0].toUpperCase() }}
        </p>
      </div>
      <p class="text-white text-xl font-normal leading-loose my-auto">{{ quote.user.username }}</p>
    </div>

    <p class="text-white text-xl font-normal leading-loose">
      {{ quote.content }}
      <span class="text-orange-200 text-xl font-medium leading-loose ml-2">
        {{ quote.movie_name }}.</span
      >
      ({{ quote.movie_release_date }})
    </p>

    <img :src="quoteImage(quote.thumbnail)" class="w-full lg:h-500px h-200px object-cover" />

    <div class="inline-flex gap-8 mt-4 mb-2">
      <div class="inline-flex gap-4">
        <p class="text-white text-xl font-normal leading-loose">{{ quote.comments.length }}</p>
        <IconComment class="my-auto" />
      </div>
      <IconLike
        class="my-auto"
        :likesCount="quote.likes_count"
        :liked="quote.liked_by_user"
        :quoteId="quote.id"
      />
    </div>

    <hr class="border border-gray-500 w-full" />

    <CommentCard :comments="quote.comments" />

    <div class="inline-flex gap-6 mb-8">
      <img :src="authUserThumbnail" class="rounded-full w-52px h-52px" v-if="authUserThumbnail" />
      <div class="w-52px h-52px rounded-full bg-red-800 justify-center flex" v-else>
        <p class="text-white text-xl font-normal leading-loose flex my-auto">
          {{ useUserStore().user.username[0].toUpperCase() }}
        </p>
      </div>
      <input
        type="text"
        :placeholder="$t('quotes.write_a_comment')"
        v-model="commentText"
        name="comment"
        class="pl-7 py-3 h-52px w-full bg-zinc-800 text-white outline-none rounded-lg placeholder:text-gray-300 text-xl font-normal leading-loose"
        @keyup.enter="createComment(quote)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, computed, onBeforeUnmount } from 'vue'
import { getQuotes } from '@/services/quotes'
import IconComment from '@/components/icons/input/IconComment.vue'
import IconLike from '@/components/icons/IconLike.vue'
import CommentCard from '@/components/shared/CommentCard.vue'
import { addComment } from '@/services/quotes.js'
import { useUserStore } from '@/store/useUserStore'
import { useNewsFeedStore } from '@/store/useNewsFeedStore'
import router from '@/router/index.js'

const quotes = ref([])
const commentText = ref('')
const newsFeedStore = useNewsFeedStore()

const currentPage = ref(1)
const remainingPages = ref(1)
const showPage = ref(1)

const profileImage = (thumbnail) => {
  return import.meta.env.VITE_API_AUTH_URL + thumbnail
}

const filteredQuotes = computed(() => {
  const searchValue = newsFeedStore.searchValue.trim()
  if (searchValue === '') {
    return quotes.value
  }
  let result
  const content = searchValue.slice(1)

  if (searchValue.startsWith('@')) {
    result = quotes.value.filter((quote) => quote.movie_name.includes(content))
  } else if (searchValue.startsWith('#')) {
    result = quotes.value.filter((quote) => quote.content.includes(content))
  } else {
    result = quotes.value.filter((quote) => quote.content.includes(searchValue))
  }

  if (result.length <= 1) {
    fetchQuotes()
  }

  return result
})

const visibleQuotes = computed(() => {
  const endIndex = showPage.value * 5
  return filteredQuotes.value.slice(0, endIndex)
})

const createComment = async (quote) => {
  try {
    const comment = commentText.value
    await addComment(quote.id, comment).then((res) => {
      commentText.value = ''
      quote.comments_count = res.data.comments_count
    })
  } catch (error) {
    router.push({ name: 'forbidden' })
  }
}

const authUserThumbnail = computed(() => {
  const thumbnail = useUserStore().user?.thumbnail
  if (thumbnail) {
    return import.meta.env.VITE_API_AUTH_URL + thumbnail
  }
  return null
})

const quoteImage = (image) => {
  return import.meta.env.VITE_API_AUTH_URL + image
}

onBeforeMount(async () => {
  await fetchQuotes()
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.Echo.channel('likes').listen('QuoteLikeUpdated', (data) => {
    const quote = quotes.value.find((quote) => quote.id === data.message.quote_id)
    if (quote) {
      quote.likes_count = data.message.likes_count
    }
  })

  window.Echo.channel('comments').listen('CommentAdded', (data) => {
    const quote = quotes.value.find((quote) => quote.id === data.message.quote_id)
    if (quote) {
      quote.comments.push(data.message)
    }
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.Echo.leaveChannel('likes')
  window.Echo.leaveChannel('comments')
})

const handleScroll = async () => {
  if (
    window.innerHeight + window.pageYOffset >= document.body.offsetHeight &&
    !newsFeedStore.isFetchingQuotes
  ) {
    newsFeedStore.isFetchingQuotes = true
    const count = filteredQuotes.value.length
    while (count === filteredQuotes.value.length && remainingPages.value > 0) {
      await fetchQuotes()
    }
    newsFeedStore.isFetchingQuotes = false
    showPage.value++
  }
}

const fetchQuotes = async () => {
  try {
    const response = await getQuotes(currentPage.value)
    remainingPages.value = response.data.remaining_pages
    if (response.data.length === 0) {
      window.removeEventListener('scroll', handleScroll)
    } else {
      quotes.value = [...quotes.value, ...response.data.data]
      currentPage.value++
    }
  } catch (error) {
    router.push({ name: 'forbidden' })
  }
}
</script>
