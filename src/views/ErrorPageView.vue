<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <div class="flex flex-col items-center justify-center">
            <IconErrorGhost class="w-1/2 h-1/2" />
            <h1 class="text-white text-[47px] font-bold leading-10 mt-7">Whoops!</h1>
            <p class="text-white text-[24px] font-medium leading-9 mt-3">{{
                $t('error.we_cant_see_the_page_youre_looking_for') }}</p>
            <ButtonRed class="rounded-lg mt-12" :text="$t('error.return_home')" @click="returnHome" />
        </div>
    </div>
</template>

<script setup>
import IconErrorGhost from '@/components/icons/error/IconErrorGhost.vue';
import ButtonRed from '@/components/ui/ButtonRed.vue';
import router from '@/router/index.js';


const returnHome = () => {
    router.push({ name: 'home' })
}
</script>