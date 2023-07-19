<template>
  <FeedLayout>
    <ModalAddQuote v-if="useModalStore().showQuoteAddModal" />
    <div class="flex flex-col gap-12 lg:w-938 mx-auto mb-48">
      <div class="inline-flex gap-6 -mb-6 w-full">
        <div
          class="h-52px px-4 inline-flex gap-4 lg:bg-zinc-800 rounded-lg mt-4 lg:mt-0 cursor-pointer whitespace-nowrap"
          :class="{ 'w-max': showSearch, 'w-5/6': !showSearch }"
          @click="useModalStore().toggleQuoteAddModal"
        >
          <IconPencilSquare class="my-auto" />
          <p class="text-white text-xl font-normal my-auto leading-loose">
            {{ $t('quotes.write_new_quote') }}
          </p>
        </div>
        <div class="hidden lg:block my-auto" :class="{ 'lg:w-3/4': showSearch }">
          <div
            v-if="showSearch"
            class="border-b w-full border-zinc-100 border-opacity-30 inline-flex gap-1"
          >
            <IconSearch class="my-auto" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('feed.search', { atSymbol: '@', hashSymbol: '#' })"
              class="px-2 w-full text-white h-52px my-auto bg-transparent outline-none"
            />
          </div>

          <div v-if="!showSearch" class="flex flex-row gap-4" @click="showSearch = true">
            <IconSearch class="my-auto" />
            <p class="text-gray-300 text-xl font-normal leading-loose my-auto">
              {{ $t('feed.search_by') }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="useNewsFeedStore().isFetchingQuotes" class="text-center text-white mt-4">
        Loading...
      </div>
      <NewsFeedCards />
    </div>
  </FeedLayout>
</template>

<script setup>
import FeedLayout from '@/components/layouts/FeedLayout.vue'
import { ref, watch } from 'vue'
import IconPencilSquare from '@/components/icons/feed/IconPencilSquare.vue'
import IconSearch from '@/components/icons/movie/IconSearch.vue'
import NewsFeedCards from '@/components/newsfeed/NewsFeedCards.vue'
import ModalAddQuote from '@/components/newsfeed/ModalAddQuote.vue'
import { useModalStore } from '@/store/useModalStore'
import { useNewsFeedStore } from '@/store/useNewsFeedStore'

const showSearch = ref(false)
const searchQuery = ref('')

watch(searchQuery, () => {
  useNewsFeedStore().searchValue = searchQuery.value
})
</script>
