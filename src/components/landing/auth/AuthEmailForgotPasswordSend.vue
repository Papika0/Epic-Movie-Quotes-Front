<template>
  <ModalLayout @close="modalStore.toggleEmailForgotPasswordSendModal" :small="true">
    <template v-slot:header>
      <IconEmailSent class="w-14 h-14" />
      <h2 class="text-white lg:text-3xl text-2xl font-bold">{{ $t('auth.check_your_email') }}</h2>
    </template>
    <template v-slot:body>
      <p class="text-white text-center">
        {{ $t('auth.we_have_sent_a_password_recover_instructions_to_your_email') }}
      </p>
      <ButtoneRed :text="$t('auth.go_to_my_email')" class="w-full mt-5" @click="RedirectToMail" />
    </template>
    <template v-slot:footer>
      <p class="text-placeholder cursor-pointer mx-auto" @click="switchToLogin()">
        {{ $t('auth.skip_i_will_confirm_later') }}
      </p>
    </template>
  </ModalLayout>
</template>

<script setup>
import ModalLayout from '@/components/layouts/ModalLayout.vue'
import IconEmailSent from '@/components/icons/IconEmailSent.vue'
import { useModalStore } from '@/store/useModalStore.js'
import ButtoneRed from '@/components/ui/ButtonSubmitRed.vue'

const modalStore = useModalStore()

function RedirectToMail() {
  window.open(`https://gmail.com`, '_blank')
}

function switchToLogin() {
  modalStore.toggleEmailForgotPasswordSendModal()
  modalStore.toggleLoginModal()
}
</script>
