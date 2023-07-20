<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="flex flex-col items-center justify-center">
      <IconForbiddenGandolf class="w-1/2 h-1/2" />
      <h1 class="text-white text-5xl font-bold leading-10 mt-7 text-center">
        {{ $t('error.you_shall_not_pass') }}
      </h1>
      <p class="text-white text-2xl font-medium leading-9 mt-3 text-center">
        {{ $t('error.sorry_but_you_dont_have_permission_to_access_this_page') }}
      </p>
      <ButtonSubmitRed
        class="rounded-lg mt-12"
        :text="$t('error.return_home')"
        @click="returnHome"
      />
    </div>
  </div>
</template>

<script setup>
import IconForbiddenGandolf from '@/components/icons/error/IconForbiddenGandolf.vue'
import ButtonSubmitRed from '@/components/ui/ButtonSubmitRed.vue'
import router from '@/router/index.js'
import { onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const returnHome = () => {
  router.push({ name: 'home' })
}

onBeforeMount(() => {
  const storedLocale = localStorage.getItem('selectedLocale')
  if (storedLocale === 'ge') {
    locale.value = 'ge'
  } else {
    locale.value = 'en'
  }
})
</script>
