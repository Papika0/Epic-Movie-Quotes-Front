<template>
  <ModalLayout @close="modalStore.toggleRegisterModal">
    <template v-slot:header>
      <h2 class="text-white lg:text-3xl text-2xl font-bold">{{ $t('auth.create_an_account') }}</h2>
      <h3 class="text-placeholder">{{ $t('auth.start_your_journey') }}</h3>
    </template>

    <template v-slot:body>
      <Form class="flex flex-col gap-4 w-full" @submit="handleSubmit">
        <InputMain
          name="username"
          :label="$t('auth.name')"
          :placeholder="$t('auth.at_least_3_and_max_15_lower_characters')"
          rules="required|min:3|max:15|lowercase"
          :apiError="Boolean(usernameError)"
        />
        <p v-if="usernameError" class="text-red-star text-sm">{{ usernameError }}</p>
        <InputMain
          name="email"
          :label="$t('auth.email')"
          :placeholder="$t('auth.enter_your_email')"
          rules="required|email"
          :apiError="Boolean(emailError)"
        />
        <p v-if="emailError" class="text-red-star text-sm">{{ emailError }}</p>
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
        <ButtoneRed :text="$t('auth.get_started')" type="submit" class="mt-2" />
        <ButtonSubmitDark
          :text="$t('auth.sign_up_with_google')"
          :gmail="true"
          @click="googleSignUp()"
        />
      </Form>
    </template>
    <template v-slot:footer>
      <div class="flex gap-1 mx-auto">
        <p class="text-placeholder">{{ $t('auth.already_have_an_account') }}</p>
        <span
          class="underline text-my-blue cursor-pointer"
          @click="modalStore.switchLoginRegisterModal"
          >{{ $t('auth.log_in') }}</span
        >
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
import InputMain from '@/components/ui/InputMain.vue'
import ButtoneRed from '@/components/ui/ButtonSubmitRed.vue'
import ButtonSubmitDark from '@/components/ui/ButtonSubmitDark.vue'
import { register, googleSign } from '@/services/auth.js'
import router from '@/router/index.js'

const modalStore = useModalStore()
const userStore = useUserStore()

const apiErrors = ref(null)

const emailError = computed(() => {
  if (apiErrors.value?.email) {
    return apiErrors.value.email[0]
  }
  return null
})

const usernameError = computed(() => {
  if (apiErrors.value?.username) {
    return apiErrors.value.username[0]
  }
  return null
})

async function googleSignUp() {
  try {
    await googleSign().then((response) => {
      window.location.href = response.data.url
    })
  } catch (error) {
    router.push({ name: 'forbidden' })
  }
}

async function handleSubmit(values) {
  apiErrors.value = null
  await register(values.username, values.email, values.password)
    .then((data) => {
      userStore.setEmail(data.data.email)
      modalStore.toggleRegisterModal()
      modalStore.toggleEmailSentModal()
    })
    .catch((error) => {
      apiErrors.value = error?.response.data.errors
    })
}
</script>
