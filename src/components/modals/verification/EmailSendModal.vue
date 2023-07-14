<template>
    <LayoutModal @close="modalStore.toggleEmailSentModal" :small="true">
        <template v-slot:header>
            <IconEmailSent class="w-14 h-14" />
            <h2 class="text-white lg:text-3xl text-2xl font-bold">{{ $t('auth.thank_you') }}</h2>
        </template>
        <template v-slot:body>
            <p class="text-white text-center">{{ $t('auth.check_your_email') }}</p>
        </template>
        <template v-slot:footer>
            <ButtoneRed :text="$t('auth.go_to_my_email')" class="mt-2 w-full" @click="RedirectToMail" />
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