<template>
    <RegisterModal v-if="modalStore.showRegisterModal" />
    <LoginModal v-if="modalStore.showLoginModal" />
    <EmailSendModal v-if="modalStore.showEmailSentModal" />
    <EmailVerifiedModal v-if="modalStore.showEmailVerifiedModal" />
    <EmailForgotPasswordModal v-if="modalStore.showEmailForgotPasswordModal" />
    <EmailForgotPasswordSendModal v-if="modalStore.showEmailForgotPasswordSendModal" />
    <ResetPasswordModal v-if="modalStore.showResetPasswordModal" />
    <EmailVerificationResendModal v-if="modalStore.showEmailVerificationResendModal" />
    <ResetPasswordResendModal v-if="modalStore.showResetPasswordResendModal" />
    <ResetPasswordSuccessModal v-if="modalStore.showResetPasswordSuccessModal" />
</template>

<script setup>
import RegisterModal from '@/components/modals/auth/RegisterModal.vue';
import LoginModal from '@/components/modals/auth/LoginModal.vue';
import EmailSendModal from '@/components/modals/verification/EmailSendModal.vue';
import EmailVerifiedModal from '@/components/modals/verification/EmailVerifiedModal.vue';
import EmailVerificationResendModal from '@/components/modals/verification/EmailVerificationResendModal.vue';
import EmailForgotPasswordModal from '@/components/modals/password/EmailForgotPasswordModal.vue';
import EmailForgotPasswordSendModal from '@/components/modals/password/EmailForgotPasswordSendModal.vue';
import ResetPasswordModal from '@/components/modals/password/ResetPasswordModal.vue';
import ResetPasswordResendModal from '@/components/modals/password/ResetPasswordResendModal.vue';
import ResetPasswordSuccessModal from '@/components/modals/password/ResetPasswordSuccessModal.vue';
import { useModalStore } from '@/store/useModalStore.js';


const modalStore = useModalStore();


</script>