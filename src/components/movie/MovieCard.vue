<template>
    <div class="flex flex-col items-start gap-4 cursor-pointer" @click="redirectToMovie">
        <img :src="movieThumbnail" :alt="movie.name"
            class="w-[440px] h-[371px] rounded-xl border backdrop-blur-[50px] -z-10 object-cover" />
        <div class="text-white text-2xl font-medium uppercase leading-9">
            {{ movie.name }} ({{ movie.release_year }})
        </div>
        <div class="flex items-center gap-3">
            <div class="bg-white bg-opacity-0 flex-col justify-center items-start">
                <div class="text-white text-xl font-normal leading-loose">
                    {{ movie.quotes_count }}
                </div>
            </div>
            <IconQuoteSymbol class="w-8 h-8 relative -z-10" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import router from '@/router/index.js';
import IconQuoteSymbol from '@/components/icons/movie/IconQuoteSymbol.vue';

const props = defineProps({
    movie: {
        type: Object,
        required: true,
    },
});

const redirectToMovie = () => {
    router.push({
        name: 'movie-details',
        params: {
            id: props.movie.id,
        },
    });
};

const movieThumbnail = computed(() => import.meta.env.VITE_API_AUTH_URL + props.movie.thumbnail);
</script>