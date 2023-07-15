<template>
  <header class="flex flex-row justify-between lg:mx-16 mx-4 pt-8">
    <p class="text-header text-base my-auto">MOVIE QUOTES</p>
    <div class="flex lg:flex-row flex-row-reverse gap-3 lg:gap-4">
      <LanguageDropDown class="hidden lg:block" />
      <ButtonRed :text="$t('auth.sign_up')" @click="signUpModal()" customClass="px-3 py-2 lg:px-6" />
      <ButtonDark :text="$t('auth.log_in')" @click="logInModal()" />
    </div>
  </header>
  <AuthModals />
  <div :class="modalStore.getModalActiveState ? 'h-screen' : ''">
    <section class="flex flex-col items-center lg:mt-64 mt-36">
      <p class="lg:text-6xl text-2xl text-center text-header font-bold leading-9 lg:leading-[90px] font-title">Find any
        quote in <br>
        millions of movie lines</p>
      <ButtonRed :text="$t('auth.get_started')" class="mt-6" customClass="px-3 py-2 lg:px-6" @click="getStarted()" />
    </section>
  </div>
  <section class="mt-52">
    <div class="bg-home1 min-h-screen bg-center bg-cover ">
      <MovieQuoteParagraph movie="Interstellar, 2014">
        “You have to leave somethig <br> behind to go forward”
      </MovieQuoteParagraph>
    </div>
    <div class="bg-home2 min-h-screen bg-center bg-fixed bg-cover">
      <MovieQuoteParagraph movie="The Royal Tenenbaums, 2001">
        I think we’re just gonna have <br>
        to be secretly in love with earch other <br>
        and leave it that
      </MovieQuoteParagraph>
    </div>
    <div class="bg-home3 min-h-screen bg-right lg:bg-center bg-fixed bg-cover">
      <MovieQuoteParagraph movie="The Royal Tenenbaums, 2001">
        I think we’re just gonna have <br>
        to be secretly in love with earch other <br>
        and leave it that
      </MovieQuoteParagraph>
    </div>
  </section>
  <p class="text-header text-xs float-left lg:ml-16 ml-8 py-4">© 2022 movie quotes. All rights reserved.</p>
</template>


<script setup>
import MovieQuoteParagraph from '@/components/home/MovieQuoteParagraph.vue';
import ButtonRed from '@/components/ui/ButtonRed.vue';
import ButtonDark from '@/components/ui/ButtonDark.vue';
import AuthModals from '@/components/home/AuthModals.vue';
import LanguageDropDown from '@/components/shared/LanguageDropDown.vue';
import router from '@/router/index.js';

import { useModalStore } from '@/store/useModalStore.js';
import { useAuthStore } from '@/store/useAuthStore.js';


const modalStore = useModalStore();

async function getStarted() {
  if (!useAuthStore().isAuthenticated) {
    modalStore.toggleRegisterModal();
  } else {
    router.push({ name: 'news-feed' });
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