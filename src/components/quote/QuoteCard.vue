<template>
  <div
    v-for="quote in quotesRef"
    :key="quote.id"
    class="lg:w-809px lg:h-268px h-375px bg-quote-background rounded-lg z-10 py-6 px-8 flex flex-col gap-6 relative"
  >
    <IconThreeDots
      class="my-auto absolute right-0 bottom-0 lg:bottom-auto mb-7 lg:mb-0 mr-8 cursor-pointer"
      @click="toggleDropdown(quote.id)"
    />
    <div
      v-if="activeDropdown === quote.id"
      class="w-248px h-200px absolute bg-zinc-800 rounded-lg flex flex-col gap-8 p-8 lg:mt-7 lg:left-full lg:-ml-14 bottom-0 right-0 mr-7 mb-14 lg:bottom-auto lg:right-auto lg:mr-0 lg:mb-0"
    >
      <div class="items-center gap-4 inline-flex cursor-pointer">
        <IconEye class="w-5 h-5 relative" />
        <div class="text-white leading-normal" @click="viewQuote(quote.id)">
          {{ $t('quotes.view_quote') }}
        </div>
      </div>

      <div class="items-center gap-4 inline-flex cursor-pointer">
        <IconEditPencil class="w-5 h-5 relative" />
        <div class="text-white leading-normal" @click="editQuote(quote.id)">
          {{ $t('quotes.edit') }}
        </div>
      </div>

      <div class="items-start gap-4 inline-flex cursor-pointer">
        <IconDelete class="w-5 h-5 relative" />
        <div class="text-white leading-normal" @click="deleteQuote(quote.id)">
          {{ $t('quotes.delete') }}
        </div>
      </div>
    </div>

    <div class="lg:flex-row flex flex-col gap-8 border-b border-zinc-100 border-opacity-20 pb-6">
      <img
        :src="getFullImageUrl(quote.thumbnail)"
        class="lg:w-226px h-140px rounded-sm object-cover"
      />
      <p class="lg:max-w-477 max-w-300 text-gray-300 text-2xl font-normal leading-9 my-auto">
        {{ quote.content }}
      </p>
    </div>

    <div class="inline-flex gap-8 pl-10px">
      <div class="inline-flex gap-4">
        <p class="text-white text-xl font-normal leading-loose">{{ quote.comments_count }}</p>
        <IconComment class="my-auto" />
      </div>
      <IconLike
        class="my-auto"
        :likesCount="quote.likes_count"
        :liked="quote.liked_by_user"
        :quoteId="quote.id"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue'
import IconComment from '@/components/icons/input/IconComment.vue'
import IconLike from '@/components/icons/IconLike.vue'
import IconThreeDots from '@/components/icons/IconThreeDots.vue'
import IconEditPencil from '@/components/icons/IconEditPencil.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconEye from '@/components/icons/IconEye.vue'
import router from '@/router/index.js'
import { deleteQuoteById } from '@/services/quotes.js'
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
  quotes: {
    type: Array,
    required: true,
    default: []
  }
})

const quotesRef = ref([])

onMounted(() => {
  quotesRef.value = props.quotes
})

const activeDropdown = ref(null)

onClickOutside(activeDropdown, () => (activeDropdown.value = false))

const viewQuote = (id) => {
  router.push({ name: 'quote-details', params: { id: id, type: 'view' } })
}

const editQuote = (id) => {
  router.push({ name: 'quote-details', params: { id: id, type: 'edit' } })
}

const deleteQuote = async (id) => {
  await deleteQuoteById(id).then(() => {
    quotesRef.value = quotesRef.value.filter((quote) => quote.id !== id)
  })
}

const getFullImageUrl = (thumbnail) => {
  return import.meta.env.VITE_API_AUTH_URL + thumbnail
}

const toggleDropdown = (quoteId) => {
  activeDropdown.value = activeDropdown.value === quoteId ? null : quoteId
}

onMounted(() => {
  window.Echo.channel('likes').listen('QuoteLikeUpdated', (data) => {
    const quote = quotesRef.value.find((quote) => quote.id === data.message.quote_id)
    if (quote) {
      quote.likes_count = data.message.likes_count
    }
  })
})
</script>
