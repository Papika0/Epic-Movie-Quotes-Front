<template>
  <header class="flex flex-row justify-between lg:mx-16 mx-4 pt-8">
    <p class="text-header text-base my-auto">MOVIE QUOTES</p>
    <div class="flex lg:flex-row flex-row-reverse gap-3 lg:gap-4">
      <LanguageDropDown class="hidden lg:block" />
      <ButtonSubmitRed
        :text="$t('auth.sign_up')"
        @click="modalStore.toggleRegisterModal()"
        customClass="px-3 py-2 lg:px-6"
        :disabled="useAuthStore().isAuthenticated"
      />
      <ButtonSubmitDark
        :text="$t('auth.log_in')"
        @click="modalStore.toggleLoginModal()"
        :disabled="useAuthStore().isAuthenticated"
      />
    </div>
  </header>
  <LandingAuthModals />
  <div :class="modalStore.getModalActiveState ? 'h-screen' : ''">
    <section class="flex flex-col items-center lg:mt-64 mt-36">
      <p
        class="lg:text-6xl text-2xl text-center text-header font-bold leading-9 lg:leading-90 font-title max-w-2xl"
      >
        {{ $t('texts.welcome') }}
      </p>
      <ButtonSubmitRed
        :text="$t('auth.get_started')"
        class="mt-6"
        customClass="px-3 py-2 lg:px-6"
        @click="getStarted()"
      />
    </section>
  </div>
  <section class="mt-52">
    <div class="bg-home1 min-h-screen bg-center bg-cover">
      <LandingMovieParagraph :movie="$t('texts.interstellar') + ', 2014'">
        {{ $t('texts.first_movie_quote') }}
      </LandingMovieParagraph>
    </div>
    <div class="bg-home2 min-h-screen bg-center bg-fixed bg-cover">
      <LandingMovieParagraph :movie="$t('texts.the_royal_tenenbaums') + ', 2001'">
        {{ $t('texts.second_movie_quote') }}
      </LandingMovieParagraph>
    </div>
    <div class="bg-home3 min-h-screen bg-right lg:bg-center bg-fixed bg-cover">
      <LandingMovieParagraph :movie="$t('texts.lord_of_the_rings') + ', 2002'">
        {{ $t('texts.third_movie_quote') }}
      </LandingMovieParagraph>
    </div>
  </section>
  <p class="text-header text-xs float-left lg:ml-16 ml-8 py-4">© {{ $t('texts.copyright') }}</p>
</template>

<script setup>
import LandingMovieParagraph from '@/components/landing/LandingMovieParagraph.vue'
import ButtonSubmitRed from '@/components/ui/ButtonSubmitRed.vue'
import ButtonSubmitDark from '@/components/ui/ButtonSubmitDark.vue'
import LandingAuthModals from '@/components/landing/LandingAuthModals.vue'
import LanguageDropDown from '@/components/shared/LanguageDropDown.vue'
import router from '@/router/index.js'

import { useModalStore } from '@/store/useModalStore.js'
import { useAuthStore } from '@/store/useAuthStore.js'

const modalStore = useModalStore()

async function getStarted() {
  if (!useAuthStore().isAuthenticated) {
    modalStore.toggleRegisterModal()
  } else {
    router.push({ name: 'news-feed' })
  }
}
</script>
