<template>
  <ModalLayout @close="modalStore.toggleResetPasswordResendModal" :small="true">
    <template v-slot:header>
      <IconExpired />
      <h2 class="text-white lg:text-3xl text-2xl font-bold">{{ $t('auth.link_expired') }}</h2>
    </template>
    <template v-slot:body>
      <p class="text-white text-center">
        {{ $t('auth.login_link_has_expired_because_you_havent_used_it') }}
      </p>
    </template>
    <template v-slot:footer>
      <ButtoneRed :text="$t('auth.request_another_link')" class="mt-2 w-full" @click="resend()" />
    </template>
  </ModalLayout>
</template>

<script setup>
import ModalLayout from '@/components/layouts/ModalLayout.vue'
import IconExpired from '@/components/icons/IconExpired.vue'
import { useModalStore } from '@/store/useModalStore.js'
import { useUserStore } from '@/store/useUserStore.js'
import ButtoneRed from '@/components/ui/ButtonSubmitRed.vue'
import { sendResetPasswordLink } from '@/services/auth.js'

const modalStore = useModalStore()

function resend() {
  sendResetPasswordLink(useUserStore().email)
  modalStore.toggleResetPasswordResendModal()
  modalStore.toggleEmailSentModal()
}
</script>
