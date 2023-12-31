<template>
  <FeedLayout>
    <MovieAddModal v-if="useModalStore().showMovieAddModal" />
    <div class="flex flex-col lg:ml-420px mx-8">
      <div
        class="text-white lg:text-2xl font-medium leading-9 flex flex-row justify-between mt-5 lg:mt-0"
      >
        <p class="hidden lg:block">
          {{ $t('movies.my_list_of_movies') }} ({{ $t('movies.total') }} {{ movies.length }})
        </p>
        <div class="lg:hidden flex flex-col">
          <p class="text-white text-xl font-medium leading-9">
            {{ $t('movies.my_list_of_movies') }}
          </p>
          <p>({{ $t('movies.total') }} {{ movies.length }})</p>
        </div>
        <div class="flex flex-row gap-8 px lg:mr-16">
          <div v-if="showSearch" class="flex items-center gap-4">
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('movies.search_movie')"
              class="px-2 my-auto rounded-md bg-transparent outline-none focus:outline-none"
            />
            <button
              @click="clearSearch"
              class="text-gray-400 hover:text-gray-600 my-auto focus:outline-none"
            >
              {{ $t('movies.clear') }}
            </button>
          </div>

          <div
            v-show="!showSearch"
            class="lg:flex flex-row gap-4 hidden"
            @click="showSearch = true"
          >
            <IconSearch class="my-auto" />
            <p class="text-gray-300 text-xl font-normal leading-loose my-auto">
              {{ $t('movies.search') }}
            </p>
          </div>
          <div>
            <ButtonSubmitRed
              :text="$t('movies.add_movie')"
              :add="true"
              @click="useModalStore().toggleMovieAddModal"
              customClass="px-3 py-1 lg:px-6 lg:py-2"
            />
          </div>
        </div>
      </div>
      <div class="grid lg:grid-cols-3 grid-cols-1 gap-8 mt-55px lg:mb-96 mb-64 lg:mr-10">
        <MovieCard v-for="movie in filteredMovies" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </FeedLayout>
</template>

<script setup>
import { ref, onBeforeMount, computed, watch } from 'vue'
import MovieAddModal from '@/components/movie/MovieAddModal.vue'
import FeedLayout from '@/components/layouts/FeedLayout.vue'
import ButtonSubmitRed from '@/components/ui/ButtonSubmitRed.vue'
import IconSearch from '@/components/icons/movie/IconSearch.vue'
import MovieCard from '@/components/movie/MovieCard.vue'
import { useMovieStore } from '@/store/useMovieStore'
import { useModalStore } from '@/store/useModalStore.js'

const movies = ref([])
const searchQuery = ref('')
const showSearch = ref(false)

const filteredMovies = computed(() => {
  if (searchQuery.value === '') {
    return movies.value
  } else {
    const query = searchQuery.value.toLowerCase()
    return movies.value.filter((movie) => movie.name.toLowerCase().includes(query))
  }
})

const clearSearch = () => {
  searchQuery.value = ''
}

watch(
  () => useMovieStore().movies,
  (value) => {
    if (value) {
      movies.value = value
    }
  }
)

onBeforeMount(async () => {
  if (useMovieStore().movies.length === 0) {
    useMovieStore()
      .getMovies()
      .then(() => {
        movies.value = useMovieStore().movies
      })
  }
  movies.value = useMovieStore().movies
})
</script>
