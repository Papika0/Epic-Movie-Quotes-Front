<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <div class="flex flex-col items-center justify-center">
            <IconForbiddenGandolf class="w-1/2 h-1/2" />
            <h1 class="text-white text-[47px] font-bold leading-10 mt-7">You shall not pass!</h1>
            <p class="text-white text-[24px] font-medium leading-9 mt-3">Sorry, but you don’t have permission to access this
                page</p>
            <ButtonRed class="rounded-lg mt-12" text="Return home" @click="returnHome" />
        </div>
    </div>
</template>

<script setup>
import IconForbiddenGandolf from '@/components/icons/error/IconForbiddenGandolf.vue';
import ButtonRed from '@/components/ui/ButtonRed.vue';
import router from '@/router/index.js';


const returnHome = () => {
    router.push({ name: 'home' })
}
</script>