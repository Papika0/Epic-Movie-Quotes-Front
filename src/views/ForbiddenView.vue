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
      <ButtonRed class="rounded-lg mt-12" :text="$t('error.return_home')" @click="returnHome" />
    </div>
  </div>
</template>

<script setup>
import IconForbiddenGandolf from '@/components/icons/error/IconForbiddenGandolf.vue'
import ButtonRed from '@/components/ui/ButtonRed.vue'
import router from '@/router/index.js'

const returnHome = () => {
  router.push({ name: 'home' })
}
</script>
