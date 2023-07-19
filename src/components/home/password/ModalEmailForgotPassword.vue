<template>
  <ModalLayout @close="modalStore.toggleEmailForgotPasswordModal">
    <template v-slot:header>
      <h2 class="text-white lg:text-3xl text-2xl font-bold">{{ $t('auth.forgot_password') }}?</h2>
      <h3 class="text-placeholder text-center">
        {{ $t('auth.big_text.enter_your_email_and_will_send_password_reset') }}
      </h3>
    </template>

    <template v-slot:body>
      <Form class="flex flex-col gap-4 w-full" @submit="handleSubmit">
        <InputMain
          name="email"
          :label="$t('auth.email')"
          :placeholder="$t('auth.enter_your_email')"
          rules="required|email"
          :apiError="Boolean(emailError)"
        />
        <p v-if="emailError" class="text-red-star text-sm">{{ emailError }}</p>
        <ButtoneRed :text="$t('auth.send_instructions')" type="submit" class="mt-2" />
      </Form>
    </template>
    <template v-slot:footer>
      <div class="flex flex-row gap-1 mx-auto items-center cursor-pointer" @click="switchToLogin()">
        <IconArrowBack class="w-3 h-3" />
        <span class="text-placeholder">{{ $t('auth.back_to_login') }}</span>
      </div>
    </template>
  </ModalLayout>
</template>

<script setup>
import ModalLayout from '@/components/layouts/ModalLayout.vue'
import { Form } from 'vee-validate'
import { ref, computed } from 'vue'
import { useModalStore } from '@/store/useModalStore.js'
import { useUserStore } from '@/store/useUserStore.js'
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import InputMain from '@/components/ui/InputMain.vue'
import ButtoneRed from '@/components/ui/ButtonSubmitRed.vue'
import { sendResetPasswordLink } from '@/services/auth.js'

const modalStore = useModalStore()
const userStore = useUserStore()

const apiErrors = ref(null)

const emailError = computed(() => {
  if (apiErrors.value?.email) {
    return apiErrors.value.email[0]
  }
  return null
})

function switchToLogin() {
  modalStore.toggleEmailForgotPasswordModal()
  modalStore.toggleLoginModal()
}

async function handleSubmit(values) {
  apiErrors.value = null
  await sendResetPasswordLink(values.email)
    .then((data) => {
      userStore.setEmail(data.data.email)
      modalStore.toggleEmailForgotPasswordModal()
      modalStore.toggleEmailForgotPasswordSendModal()
    })
    .catch((error) => {
      apiErrors.value = error.response.data.errors
    })
}
</script>
