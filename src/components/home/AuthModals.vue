<template>
  <ModalRegister v-if="modalStore.showRegisterModal" />
  <ModalLogin v-if="modalStore.showLoginModal" />
  <ModalEmailSend v-if="modalStore.showEmailSentModal" />
  <ModalEmailVerified v-if="modalStore.showEmailVerifiedModal" />
  <ModalEmailForgotPassword v-if="modalStore.showEmailForgotPasswordModal" />
  <ModalEmailForgotPasswordSend v-if="modalStore.showEmailForgotPasswordSendModal" />
  <ModalResetPassword v-if="modalStore.showResetPasswordModal" />
  <ModalEmailVerificationResend v-if="modalStore.showEmailVerificationResendModal" />
  <ModalResetPasswordResend v-if="modalStore.showResetPasswordResendModal" />
  <ModalResetPasswordSuccess v-if="modalStore.showResetPasswordSuccessModal" />
</template>

<script setup>
import ModalRegister from '@/components/home/auth/ModalRegister.vue'
import ModalLogin from '@/components/home/auth/ModalLogin.vue'
import ModalEmailSend from '@/components/home/verification/ModalEmailSend.vue'
import ModalEmailVerified from '@/components/home/verification/ModalEmailVerified.vue'
import ModalEmailVerificationResend from '@/components/home/verification/ModalEmailVerificationResend.vue'
import ModalEmailForgotPassword from '@/components/home/password/ModalEmailForgotPassword.vue'
import ModalEmailForgotPasswordSend from '@/components/home/password/ModalEmailForgotPasswordSend.vue'
import ModalResetPassword from '@/components/home/password/ModalResetPassword.vue'
import ModalResetPasswordResend from '@/components/home/password/ModalResetPasswordResend.vue'
import ModalResetPasswordSuccess from '@/components/home/password/ModalResetPasswordSuccess.vue'
import { useModalStore } from '@/store/useModalStore.js'

const modalStore = useModalStore()
</script>
