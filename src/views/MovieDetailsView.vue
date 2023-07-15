<template>
    <LayoutFeed>
        <MovieEditModal v-if="useModalStore().showMovieEditModal" :movie="movieDataForEdit" />
        <div class="flex flex-col lg:ml-420px">
            <p class="text-white text-2xl font-medium leading-9 hidden lg:block">{{ $t('movies.movie_description') }}</p>

            <div class="mt-33px mb-20 lg:mr-16 flex flex-col gap-10">

                <div class="flex lg:flex-row flex-col gap-5 mx-8 lg:mx-0">
                    <img :src="movieThumbnail"
                        class="lg:h-440px lg:w-809px w-358 h-302px rounded-xl border object-cover -z-50" />

                    <div class="flex flex-col gap-5 lg:w-2/5">
                        <div class="flex lg:flex-row flex-col-reverse justify-between">
                            <p class="text-orange-200 text-2xl my-auto font-medium lowercase leading-9">{{ movie.name }}
                                ({{
                                    movie.release_year }})</p>
                            <div class="flex flex-row gap-4 py-3 px-6 bg-zinc-800 rounded-lg w-fit">
                                <IconEditPencil class="my-auto cursor-pointer"
                                    @click="useModalStore().toggleMovieEditModal" />
                                <hr class="rotate-90 border border-gray-500 w-5  my-auto">
                                <IconDelete class="my-auto cursor-pointer" @click="movieDelete" />
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-2 mt-1 max-w-lg">
                            <div v-for="option in movie.genres" :key="option.id"
                                class="rounded-md items-center py-6px px-3 bg-gray-500">
                                <p class="text-white text-sm font-normal leading-snug">{{ option.name }}
                                </p>
                            </div>
                        </div>

                        <div class="inline-flex lg:gap-2 ">
                            <p class="text-gray-300 text-lg font-bold  leading-relaxed">{{ $t('movies.director') }}:
                            </p>
                            <p class="text-white text-lg font-medium  leading-relaxed"> {{ movie.director }}</p>
                        </div>
                        <p class="text-gray-300 text-lg leading-relaxed"> {{ movie.description }}</p>

                    </div>
                </div>

                <div class="flex lg:flex-row flex-col-reverse lg:gap-4 gap-8 lg:mb-10 mx-8 lg:mx-0">
                    <p class="text-white text-2xl font-medium leading-9 my-auto lg:block hidden">{{ $t('movies.quotes') }}
                        ({{
                            $t('movies.total') }} {{ movie.quotes_count }})
                    </p>
                    <div class="lg:hidden flex flex-col">
                        <p class="text-white text-2xl font-medium leading-9 my-auto">{{ $t('movies.quotes') }} </p>
                        <p class="text-white my-auto"> ({{
                            $t('movies.total') }} {{ movie.quotes_count }})</p>
                    </div>
                    <hr class="lg:rotate-90 border -z-50 lg:border-gray-500 border-zinc-600 lg:w-6 my-auto">
                    <div>
                        <ButtonRed :text="$t('movies.add_quote')" :add="true" customClass="py-2 px-4" @click="addQuote" />
                    </div>
                </div>

                <QuoteCard :quotes="movie.quotes" v-if="movie.quotes" />

            </div>
        </div>
    </LayoutFeed>
</template>
  

  
<script setup>
import { ref, onBeforeMount, computed, defineProps } from 'vue';
import IconEditPencil from '@/components/icons/IconEditPencil.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import LayoutFeed from '@/components/layouts/LayoutFeed.vue';
import ButtonRed from '@/components/ui/ButtonRed.vue';
import QuoteCard from '@/components/quote/QuoteCard.vue';

import MovieEditModal from '@/components/modals/movie/MovieEditModal.vue';
import { getMovieById, deleteMovie, getMovieValuesForEdit } from '@/services/movies.js';
import { useModalStore } from '@/store/useModalStore.js';

import router from '@/router/index.js';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const movie = ref([]);
const movieDataForEdit = ref([]);

const addQuote = () => {
    router.push({ name: 'quote-details', params: { id: props.id, type: 'add' } });
};

const movieDelete = async () => {
    try {
        await deleteMovie(props.id);
        router.push({ name: 'movies' });
    } catch (error) {
        console.error('Failed to fetch movies:', error);
    }
};

onBeforeMount(async () => {
    try {
        const data = await getMovieById(props.id);
        movie.value = data;
        const editData = await getMovieValuesForEdit(props.id);
        movieDataForEdit.value = editData;
    } catch (error) {
        console.error('Failed to fetch movies:', error);
    }
});

const movieThumbnail = computed(() => import.meta.env.VITE_API_AUTH_URL + movie.value.thumbnail);
</script>
