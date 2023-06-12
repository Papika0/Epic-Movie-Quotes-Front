<template>
    <LayoutModal @close="modalStore.toggleEmailSentModal" :small="true">
        <template v-slot:header>
            <IconEmailSent class="w-14 h-14" />
            <h2 class="text-white text-3xl font-bold">Thank you!</h2>
        </template>
        <template v-slot:body>
            <p class="text-white text-center">Please check your email and follow the instructions to
                activate your account.</p>
        </template>
        <template v-slot:footer>
            <ButtoneRed text="Go to my email" class="mt-2 w-full" @click="RedirectToMail" />
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

</script>