<template>
    <LayoutFeed>
        <MovieAddModal v-if="useModalStore().showMovieAddModal" />
        <div class="flex flex-col ml-[420px]">
            <div class="text-white text-[24px] font-medium leading-9 flex flex-row justify-between">
                <p>{{ $t('movies.my_list_of_movies') }} ({{ $t('movies.total') }} {{ useUserStore().moviesCount }})</p>
                <div class="flex flex-row gap-8 mr-16">

                    <div v-if="showSearch" class="flex items-center gap-4">
                        <input v-model="searchQuery" type="text" :placeholder="$t('movies.search_movie')"
                            class="px-2 my-auto rounded-md bg-transparent outline-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button @click="clearSearch" class="text-gray-400 hover:text-gray-600 my-auto focus:outline-none">
                            {{ $t('movies.clear') }}
                        </button>
                    </div>

                    <div v-show="!showSearch" class="flex flex-row gap-4" @click="showSearch = true">
                        <IconSearch class="my-auto" />
                        <p class="text-gray-300 text-[20px] font-normal leading-loose my-auto">
                            {{ $t('movies.search') }}
                        </p>
                    </div>
                    <ButtonRed :text="$t('movies.add_movie')" :add="true" @click="useModalStore().toggleMovieAddModal" />
                </div>
            </div>
            <div class="grid grid-cols-3 gap-8 mt-[56px] mb-96 mr-10 ">
                <MovieCard v-for="movie in filteredMovies" :key="movie.id" :movie="movie" />
            </div>
        </div>
    </LayoutFeed>
</template>
  

  
<script setup>
import { ref, onMounted, computed } from 'vue';
import MovieAddModal from '@/components/modals/movie/MovieAddModal.vue';
import LayoutFeed from '@/components/layouts/LayoutFeed.vue';
import ButtonRed from '@/components/ui/ButtonRed.vue';
import IconSearch from '@/components/icons/movie/IconSearch.vue';
import { useUserStore } from '@/stores/useUserStore.js';
import MovieCard from '@/components/movie/MovieCard.vue';
import { getAllMovies } from '@/services/movies.js';
import { useModalStore } from '@/stores/useModalStore.js';

const movies = ref([]);
const searchQuery = ref('');
const showSearch = ref(false);

const filteredMovies = computed(() => {
    if (searchQuery.value === '') {
        return movies.value;
    } else {
        const query = searchQuery.value.toLowerCase();
        return movies.value.filter(movie => movie.name.toLowerCase().includes(query));
    }
});

const clearSearch = () => {
    searchQuery.value = '';
};

onMounted(async () => {
    try {
        const data = await getAllMovies();
        movies.value = data;
    } catch (error) {
        console.error('Failed to fetch movies:', error);
    }
});
</script>
  