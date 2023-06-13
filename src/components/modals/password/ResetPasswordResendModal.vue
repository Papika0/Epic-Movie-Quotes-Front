<template>
    <LayoutModal @close="modalStore.toggleResetPasswordResendModal" :small="true">
        <template v-slot:header>
            <IconExpired />
            <h2 class="text-white text-3xl font-bold">Link expired!</h2>
        </template>
        <template v-slot:body>
            <p class="text-white text-center">Login link has expired, because you haven’t used it</p>
        </template>
        <template v-slot:footer>
            <ButtoneRed text="Request another link" class="mt-2 w-full" @click="resend()" />
        </template>
    </LayoutModal>
</template>


<script setup>
import LayoutModal from '@/components/layouts/LayoutModal.vue';
import IconExpired from '@/components/icons/IconExpired.vue';
import { useModalStore } from '@/stores/useModalStore.js';
import { useUserStore } from '@/stores/useUserStore.js';
import ButtoneRed from '@/components/ui/ButtonRed.vue';
import { sendResetPasswordLink } from '@/services/auth/auth.js';

const modalStore = useModalStore();


function resend() {
    sendResetPasswordLink(useUserStore().email);
    modalStore.toggleResetPasswordResendModal();
    modalStore.toggleEmailSentModal();
}

</script>