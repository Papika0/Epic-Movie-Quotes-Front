<template>
  <ModalLayout @close="modalStore.toggleLoginModal">
    <template v-slot:header>
      <h2 class="text-white lg:text-3xl text-2xl font-bold">
        {{ $t('auth.log_in_to_your_account') }}
      </h2>
      <h3 class="text-placeholder text-center">
        {{ $t('auth.welcome_back_please_enter_your_details') }}
      </h3>
    </template>

    <template v-slot:body>
      <Form class="flex flex-col gap-4 w-full" @submit="handleSubmit">
        <InputMain
          name="email"
          :label="$t('auth.email')"
          :placeholder="$t('auth.enter_your_email')"
          :apiError="Boolean(emailError)"
          rules="required|min:3"
        />
        <p v-if="emailError" class="text-red-star text-sm">{{ emailError }}</p>
        <InputMain
          name="password"
          :label="$t('auth.password')"
          :placeholder="$t('auth.password')"
          textType="password"
          rules="required|min:8"
        />
        <div class="flex flex-row justify-between">
          <div class="items-center flex">
            <Field
              name="remember_me"
              type="checkbox"
              class="mr-2 h-4 w-4 rounded-md"
              value="true"
            />
            <label for="remember_me" class="text-white">{{ $t('auth.remember_me') }}</label>
          </div>
          <span
            class="text-my-blue cursor-pointer underline"
            @click="switchLoginForgotPasswordModal()"
            >{{ $t('auth.forgot_password') }}</span
          >
        </div>
        <ButtoneRed :text="$t('auth.sign_in')" type="submit" />
        <ButtonSubmitDark
          :text="$t('auth.sign_in_with_google')"
          :gmail="true"
          @click="googleSignIn()"
        />
      </Form>
    </template>
    <template v-slot:footer>
      <div class="flex gap-1 mx-auto">
        <p class="text-placeholder">{{ $t('auth.dont_have_an_account') }}</p>
        <span
          class="underline text-my-blue cursor-pointer"
          @click="modalStore.switchLoginRegisterModal"
          >{{ $t('auth.sign_up') }}</span
        >
      </div>
    </template>
  </ModalLayout>
</template>

<script setup>
import ModalLayout from '@/components/layouts/ModalLayout.vue'
import { Form, Field } from 'vee-validate'
import { ref, computed } from 'vue'
import { useModalStore } from '@/store/useModalStore.js'
import { useAuthStore } from '@/store/useAuthStore.js'
import InputMain from '@/components/ui/InputMain.vue'
import ButtoneRed from '@/components/ui/ButtonSubmitRed.vue'
import ButtonSubmitDark from '@/components/ui/ButtonSubmitDark.vue'
import { login, googleSign } from '@/services/auth.js'
import router from '@/router/index.js'

const modalStore = useModalStore()

const apiErrors = ref(null)

const emailError = computed(() => {
  return apiErrors.value
})

async function googleSignIn() {
  try {
    await googleSign().then((response) => {
      window.location.href = response.data.url
    })
  } catch (error) {
    router.push({ name: 'forbidden' })
  }
}

function switchLoginForgotPasswordModal() {
  modalStore.toggleLoginModal()
  modalStore.toggleEmailForgotPasswordModal()
}

async function handleSubmit(values) {
  apiErrors.value = null
  try {
    login(values.email, values.password, values.remember_me)
      .then(() => {
        modalStore.toggleLoginModal()
        useAuthStore()
          .checkAuth()
          .then(() => {
            router.push({ name: 'news-feed' })
          })
      })
      .catch((error) => {
        if (error.response.status == 403) {
          modalStore.toggleLoginModal()
          modalStore.toggleEmailSentModal()
        } else {
          apiErrors.value = error.response.data.message
        }
      })
  } catch (error) {
    router.push({ name: 'forbidden' })
  }
}
</script>
