<template>
  <ModalLayout @close="modalStore.toggleResetPasswordModal">
    <template v-slot:header>
      <h2 class="text-white lg:text-3xl text-2xl font-bold">
        {{ $t('auth.create_new_password') }}
      </h2>
      <h3 class="text-placeholder text-center">
        {{ $t('auth.big_text.your_new_password_must_be_different_from_previous_used_passwords') }}
      </h3>
    </template>

    <template v-slot:body>
      <Form class="flex flex-col gap-4 w-full" @submit="handleSubmit">
        <InputMain
          name="password"
          :label="$t('auth.password')"
          :placeholder="$t('auth.at_least_8_and_max_15_lower_characters')"
          textType="password"
          rules="required|min:8|max:15|lowercase"
        />
        <InputMain
          name="password_confirm"
          :label="$t('auth.confirm_password')"
          :placeholder="$t('auth.confirm_password')"
          textType="password"
          rules="required|confirmed:@password"
        />
        <ButtoneRed :text="$t('auth.reset_password')" type="submit" class="mt-2" />
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
import { useModalStore } from '@/store/useModalStore.js'
import { useUserStore } from '@/store/useUserStore.js'
import IconArrowBack from '@/components/icons/IconArrowBack.vue'
import InputMain from '@/components/ui/InputMain.vue'
import ButtoneRed from '@/components/ui/ButtonSubmitRed.vue'
import { resetPassword } from '@/services/auth.js'

const modalStore = useModalStore()
const userStore = useUserStore()

function switchToLogin() {
  modalStore.toggleResetPasswordModal()
  modalStore.toggleLoginModal()
}

async function handleSubmit(values) {
  await resetPassword(userStore.token, userStore.email, values.password)
    .then(() => {
      modalStore.toggleResetPasswordModal()
      modalStore.toggleResetPasswordSuccessModal()
    })
    .catch(() => {
      modalStore.toggleResetPasswordModal()
      modalStore.toggleResetPasswordResendModal()
    })
}
</script>
