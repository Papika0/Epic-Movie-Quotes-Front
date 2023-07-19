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
import RegisterModal from '@/components/home/auth/RegisterModal.vue'
import LoginModal from '@/components/home/auth/LoginModal.vue'
import EmailSendModal from '@/components/home/verification/EmailSendModal.vue'
import EmailVerifiedModal from '@/components/home/verification/EmailVerifiedModal.vue'
import EmailVerificationResendModal from '@/components/home/verification/EmailVerificationResendModal.vue'
import EmailForgotPasswordModal from '@/components/home/password/EmailForgotPasswordModal.vue'
import EmailForgotPasswordSendModal from '@/components/home/password/EmailForgotPasswordSendModal.vue'
import ResetPasswordModal from '@/components/home/password/ResetPasswordModal.vue'
import ResetPasswordResendModal from '@/components/home/password/ResetPasswordResendModal.vue'
import ResetPasswordSuccessModal from '@/components/home/password/ResetPasswordSuccessModal.vue'
import { useModalStore } from '@/store/useModalStore.js'

const modalStore = useModalStore()
</script>
