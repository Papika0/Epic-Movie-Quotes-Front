<template>
  <AuthRegister v-if="modalStore.showRegisterModal" />
  <AuthLogin v-if="modalStore.showLoginModal" />
  <AuthEmailSend v-if="modalStore.showEmailSentModal" />
  <AuthEmailVerified v-if="modalStore.showEmailVerifiedModal" />
  <AuthEmailForgotPassword v-if="modalStore.showEmailForgotPasswordModal" />
  <AuthEmailForgotPasswordSend v-if="modalStore.showEmailForgotPasswordSendModal" />
  <AuthResetPassword v-if="modalStore.showResetPasswordModal" />
  <AuthEmailVerificationResend v-if="modalStore.showEmailVerificationResendModal" />
  <AuthResetPasswordResend v-if="modalStore.showResetPasswordResendModal" />
  <AuthResetPasswordSuccess v-if="modalStore.showResetPasswordSuccessModal" />
</template>

<script setup>
import AuthRegister from '@/components/landing/auth/AuthRegister.vue'
import AuthLogin from '@/components/landing/auth/AuthLogin.vue'
import AuthEmailSend from '@/components/landing/auth/AuthEmailSend.vue'
import AuthEmailVerified from '@/components/landing/auth/AuthEmailVerified.vue'
import AuthEmailVerificationResend from '@/components/landing/auth/AuthEmailVerificationResend.vue'
import AuthEmailForgotPassword from '@/components/landing/auth/AuthEmailForgotPassword.vue'
import AuthEmailForgotPasswordSend from '@/components/landing/auth/AuthEmailForgotPasswordSend.vue'
import AuthResetPassword from '@/components/landing/auth/AuthResetPassword.vue'
import AuthResetPasswordResend from '@/components/landing/auth/AuthResetPasswordResend.vue'
import AuthResetPasswordSuccess from '@/components/landing/auth/AuthResetPasswordSuccess.vue'
import { useModalStore } from '@/store/useModalStore.js'

const modalStore = useModalStore()
</script>
