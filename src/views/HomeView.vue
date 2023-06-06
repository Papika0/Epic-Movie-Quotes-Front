<template>
  <header class="flex flex-row justify-between mx-16 pt-8">
    <p class="text-header">MOVIE QUOTES</p>
    <div class="flex flex-row gap-4">
      <select class=" bg-transparent text-white px-2 outline-none">
        <option value="en" class="bg-white text-black ">Eng</option>
        <option value="ka" class="bg-white text-black ">Ka</option>
      </select>
      <ButtonRed text="Sign Up" @click="modalStore.toggleRegisterModal" />
      <ButtonDark text="Log In" @click="modalStore.toggleLoginModal" />
    </div>
  </header>
  <RegisterModal v-if="modalStore.showRegisterModal" />
  <LoginModal v-if="modalStore.showLoginModal" />
  <div :class="modalStore.getModalActiveState ? 'h-screen' : ''">
    <section class="flex flex-col items-center mt-80  ">
      <p class="text-6xl text-center text-header font-bold font-title">Find any quote in <br>
        millions of movie lines</p>
      <ButtonRed text="Get Started" class="mt-6 px-4" @click="modalStore.toggleRegisterModal" />
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
import RegisterModal from '@/components/modals/RegisterModal.vue';
import LoginModal from '@/components/modals/LoginModal.vue';
import { useModalStore } from '@/stores/useModalStore.js';

const modalStore = useModalStore();

</script>