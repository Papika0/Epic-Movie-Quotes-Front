<template>
    <LayoutModal @close="modalStore.toggleEmailVerifiedModal" :small="true">
        <template v-slot:header>
            <IconEmailVerified class="w-14 h-14" />
            <h2 class="text-white text-3xl font-bold">Thank you!</h2>
        </template>
        <template v-slot:body>
            <p class="text-white text-center">Your account has been activated.</p>
        </template>
        <template v-slot:footer>
            <ButtoneRed text="Log In" class="mt-2 w-full" @click="switchToLogin" />
        </template>
    </LayoutModal>
</template>


<script setup>
import LayoutModal from '@/components/layouts/LayoutModal.vue';
import IconEmailVerified from '@/components/icons/IconEmailVerified.vue';
import { useModalStore } from '@/stores/useModalStore.js';
import ButtoneRed from '@/components/ui/ButtonRed.vue';

const modalStore = useModalStore();

function switchToLogin() {
    modalStore.toggleEmailVerifiedModal();
    modalStore.toggleLoginModal();
}

</script>