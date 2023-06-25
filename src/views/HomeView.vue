<template>
  <header class="flex flex-row justify-between mx-16 pt-8">
    <p class="text-header">MOVIE QUOTES</p>
    <div class="flex flex-row gap-4">
      <LanguageDropDown />
      <ButtonRed :text="$t('auth.sign_up')" @click="signUpModal()" />
      <ButtonDark :text="$t('auth.log_in')" @click="logInModal()" />
    </div>
  </header>
  <AuthModals />
  <div :class="modalStore.getModalActiveState ? 'h-screen' : ''">
    <section class="flex flex-col items-center mt-80  ">
      <p class="text-6xl text-center text-header font-bold font-title">Find any quote in <br>
        millions of movie lines</p>
      <ButtonRed :text="$t('auth.get_started')" class="mt-6 px-4" @click="getStarted()" />
    </section>
  </div>
  <section class="mt-52">
    <div class="bg-home1 min-h-screen bg-center">
      <MovieQuoteParagraph movie="Interstellar, 2014">
        “You have to leave somethig <br> behind to go forward”
      </MovieQuoteParagraph>
    </div>
    <div class="bg-home2 min-h-screen bg-center bg-fixed">
      <MovieQuoteParagraph movie="The Royal Tenenbaums, 2001">
        I think we’re just gonna have <br>
        to be secretly in love with earch other <br>
        and leave it that
      </MovieQuoteParagraph>
    </div>
    <div class="bg-home3 min-h-screen bg-center bg-fixed">
      <MovieQuoteParagraph movie="The Royal Tenenbaums, 2001">
        I think we’re just gonna have <br>
        to be secretly in love with earch other <br>
        and leave it that
      </MovieQuoteParagraph>
    </div>
  </section>
  <p class="text-header text-xs float-left ml-16 py-4">© 2022 movie quotes. All rights reserved.</p>
</template>


<script setup>
import MovieQuoteParagraph from '@/components/home/MovieQuoteParagraph.vue';
import ButtonRed from '@/components/ui/ButtonRed.vue';
import ButtonDark from '@/components/ui/ButtonDark.vue';
import AuthModals from '@/components/home/AuthModals.vue';
import LanguageDropDown from '@/components/shared/LanguageDropDown.vue';
import router from '@/router/index.js';

import { useModalStore } from '@/stores/useModalStore.js';
import { useAuthStore } from '@/stores/useAuthStore.js';


const modalStore = useModalStore();

async function getStarted() {
  if (!useAuthStore().isAuthenticated) {
    modalStore.toggleRegisterModal();
  } else {
    router.push({ name: 'profile' });
  }
}

async function signUpModal() {
  if (!useAuthStore().isAuthenticated) {
    modalStore.toggleRegisterModal();
  }
}

async function logInModal() {
  if (!useAuthStore().isAuthenticated) {
    modalStore.toggleLoginModal();
  }
}

</script>