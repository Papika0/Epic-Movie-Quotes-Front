<template>
    <LayoutModal @close="modalStore.toggleResetPasswordSuccessModal" :small="true">
        <template v-slot:header>
            <IconEmailVerified class="w-14 h-14" />
            <h2 class="text-white text-3xl font-bold">Success!</h2>
        </template>
        <template v-slot:body>
            <p class="text-white text-center">Your Password changed successfully</p>
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
    modalStore.toggleResetPasswordSuccessModal();
    modalStore.toggleLoginModal();
}

</script>