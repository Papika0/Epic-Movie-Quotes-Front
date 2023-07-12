<template>
    <LayoutModal @close="modalStore.toggleEmailVerifiedModal" :small="true">
        <template v-slot:header>
            <IconEmailVerified class="w-14 h-14" />
            <h2 class="text-white lg:text-3xl text-2xl font-bold">{{ $t('auth.thank_you') }}</h2>
        </template>
        <template v-slot:body>
            <p class="text-white text-center">{{ $t('auth.your_account_has_been_activated') }}</p>
        </template>
        <template v-slot:footer>
            <ButtoneRed :text="$t('auth.log_in')" class="mt-2 w-full" @click="switchToLogin" />
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