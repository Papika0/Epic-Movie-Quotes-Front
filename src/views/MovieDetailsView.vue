<template>
    <LayoutFeed>
        <MovieEditModal v-if="useModalStore().showMovieEditModal" :movie="movieDataForEdit" />
        <div class="flex flex-col ml-[420px]">
            <p class="text-white text-2xl font-medium leading-9">Movie discription</p>

            <div class="mt-[33px] mb-20 mr-16 flex flex-col gap-10">

                <div class="flex flex-row gap-5">
                    <img :src="movieThumbnail"
                        class=" w-3/5 h-[440px] rounded-xl border backdrop-blur-[50px] object-cover -z-50" />

                    <div class="flex flex-col gap-5 w-2/5">
                        <div class="flex flex-row justify-between ">
                            <p class="text-orange-200 text-2xl my-auto font-medium lowercase leading-9">{{ movie.name }}
                                ({{
                                    movie.release_year }})</p>
                            <div class="flex flex-row gap-4 py-3 px-6 bg-zinc-800 rounded-lg ">
                                <IconEditPencil class="my-auto cursor-pointer"
                                    @click="useModalStore().toggleMovieEditModal" />
                                <hr class=" rotate-90 border border-gray-500 w-5  my-auto">
                                <IconDelete class="my-auto cursor-pointer" @click="movieDelete" />
                            </div>
                        </div>

                        <div class="flex flex-row gap-2 mt-1">
                            <div v-for="option in movie.genres" :key="option.id"
                                class="rounded-md items-center py-[6px] px-3 bg-gray-500">
                                <p class="text-white text-sm font-normal leading-snug">{{ option.name }}
                                </p>
                            </div>
                        </div>

                        <div class="inline-flex gap-2">
                            <p class="text-gray-300 text-[18px] font-bold  leading-relaxed">Director: </p>
                            <p class="text-white text-[18px] font-medium  leading-relaxed"> {{ movie.director }}</p>
                        </div>
                        <p class="text-gray-300 text-[18px] leading-relaxed"> {{ movie.description }}</p>

                    </div>
                </div>

                <div class="flex flex-row gap-4 mb-10">
                    <p class="text-white text-2xl font-medium leading-9 my-auto">Quotes (Total {{ movie.quotes_count }})
                    </p>
                    <hr class=" rotate-90 border -z-50 border-gray-500 w-6 my-auto">
                    <ButtonRed text="Add quote" :add="true" customClass="py-2 px-4" @click="addQuote" />
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
import { useModalStore } from '@/stores/useModalStore.js';

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
