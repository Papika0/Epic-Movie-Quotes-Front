<template>
    <main class="h-screen">
        <HeaderAuthorized />
        <section class="mt-8">
            <div class="absolute ml-16 flex flex-col gap-10">
                <div class="flex flex-row gap-6 my-auto">
                    <img :src="profileImageUrl" class="rounded-full w-60 h-60 border-2 border-red-button" />
                    <div>
                        <p class="text-white text-2xl">{{ useUserStore().user?.username }}</p>
                        <p class="text-light-cyan cursor-pointer" @click="editProfile">{{
                            $t('texts.edit_profile') }}</p>
                    </div>
                </div>
                <div class="flex flex-row gap-10 my-auto">
                    <IconHouse class="ml-3" />
                    <p class="text-white text-2xl cursor-pointer">{{ $t('texts.news_feed') }}</p>
                </div>
                <div class="flex flex-row gap-10 my-auto cursor-pointer" @click="showMovies">
                    <IconMovie class="ml-3 " :isMovieRoute="isMovieRoute" />
                    <p class="text-white text-2xl ">{{ $t('texts.list_of_movies') }}</p>
                </div>
            </div>
        </section>
        <slot></slot>
    </main>
</template>
  
  
<script setup>

import { computed } from 'vue';
import HeaderAuthorized from '@/components/shared/HeaderAuthorized.vue';
import IconHouse from '@/components/icons/profile/IconHouse.vue';
import IconMovie from '@/components/icons/profile/IconMovie.vue';
import { useUserStore } from '@/stores/useUserStore';
import router from '@/router/index.js';
import { useRoute } from 'vue-router';

const route = useRoute();

const profileImageUrl = computed(() => {
    const thumbnail = useUserStore().user?.thumbnail;
    if (thumbnail) {
        return `${import.meta.env.VITE_API_AUTH_URL}/storage/${thumbnail}`;
    }
    return null;
});

const showMovies = () => {
    router.push({ name: 'movies' });
};

const editProfile = () => {
    router.push({ name: 'profile' });
};

const isMovieRoute = computed(() => {
    return route.path.includes('/movies') || route.path.startsWith('/movie/');
});
</script>