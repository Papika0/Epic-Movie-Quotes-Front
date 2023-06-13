<template>
    <LayoutModal @close="modalStore.toggleEmailForgotPasswordSendModal" :small="true">
        <template v-slot:header>
            <IconEmailSent class="w-14 h-14" />
            <h2 class="text-white text-3xl font-bold">Check your email</h2>
        </template>
        <template v-slot:body>
            <p class="text-white text-center">We have sent a password recover instructions
                to your email</p>
            <ButtoneRed text="Go to my email" class="w-full mt-5" @click="RedirectToMail" />
        </template>
        <template v-slot:footer>
            <p class="text-placeholder cursor-pointer mx-auto" @click="switchToLogin()">Skip, I’ll confirm later</p>
        </template>
    </LayoutModal>
</template>


<script setup>
import LayoutModal from '@/components/layouts/LayoutModal.vue';
import IconEmailSent from '@/components/icons/IconEmailSent.vue';
import { useModalStore } from '@/stores/useModalStore.js';
import { useUserStore } from '@/stores/useUserStore';
import ButtoneRed from '@/components/ui/ButtonRed.vue';

const modalStore = useModalStore();

function RedirectToMail() {
    const { getEmailDomain } = useUserStore();
    window.open(`https://${getEmailDomain}`, '_blank');
}

function switchToLogin() {
    modalStore.toggleEmailForgotPasswordSendModal();
    modalStore.toggleLoginModal();
}

</script>