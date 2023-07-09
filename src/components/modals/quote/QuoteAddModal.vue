<template>
    <LayoutEditModal @close="closeModal" title="Add Quote">
        <template v-slot:body>
            <Form class="flex flex-col gap-6" @submit="quoteAdd">
                <div class="flex flex-row gap-5">
                    <img :src="movieThumbnail"
                        class=" w-[290px] h-[158px] rounded-xl border backdrop-blur-[50px] object-cover -z-50" />

                    <div class="flex flex-col gap-5 mb-">
                        <div class="flex flex-row justify-between ">
                            <p class="text-orange-200 text-2xl my-auto font-medium lowercase leading-9">{{ movie.name }}
                                ({{
                                    movie.release_year }})</p>
                        </div>

                        <div class="flex flex-wrap gap-2 mt-1 max-w-xl">
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
                    </div>
                </div>
                <TextareaMovie name="content_en" placeholder="“Quote in English.”" rules="required|english" />
                <TextareaMovie name="content_ka" placeholder="“ციტატა ქართულ ენაზე”" rules="required|georgian" lang="ქარ" />

                <InputPhotoUpload name="thumbnail" rules="required" />

                <ButtonRed class="w-full rounded-lg mt-6 mb-8" text="Add quote" type="submit" />
            </Form>
        </template>
    </LayoutEditModal>
</template>


<script setup>
import LayoutEditModal from '@/components/layouts/LayoutEditModal.vue';
import ButtonRed from '@/components/ui/ButtonRed.vue';
import InputPhotoUpload from '@/components/ui/InputPhotoUpload.vue';
import { Form } from 'vee-validate';
import { defineProps, ref, onBeforeMount, computed } from 'vue';
import { getMovieById } from '@/services/movies.js';
import { createQuote } from '@/services/quotes.js';


import router from '@/router/index.js';
import TextareaMovie from '@/components/ui/TextareaMovie.vue';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const movie = ref([]);



const closeModal = () => {
    router.push({ name: 'movie-details', params: { id: movie.value.id } })
};

const quoteAdd = async (values) => {
    try {
        const data = await createQuote(values.content_en, values.content_ka, values.thumbnail, movie.value.id);
        console.log(data);
        router.push({ name: 'movie-details', params: { id: movie.value.id } })
    } catch (error) {
        console.error('Failed to fetch movies:', error);
    }
};

const movieThumbnail = computed(() => import.meta.env.VITE_API_AUTH_URL + movie.value.thumbnail);


onBeforeMount(async () => {
    try {
        const data = await getMovieById(props.id);
        movie.value = data;
    } catch (error) {
        console.error('Failed to fetch movies:', error);
    }
});


</script>