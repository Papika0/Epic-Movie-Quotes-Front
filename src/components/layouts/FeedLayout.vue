<template>
  <main class="min-h-screen">
    <HeaderAuthorized />
    <section class="lg:mt-8">
      <div
        class="absolute lg:ml-16 flex flex-col gap-10 lg:bg-transparent bg-neutral-900 w-4/5 pl-11 lg:pl-0 h-4/5 lg:w-fit lg:h-fit lg:flex"
        ref="burger"
        :class="{ hidden: !useModalStore().showBurgerMenu }"
      >
        <div class="flex flex-row lg:gap-6 gap-5 lg:my-auto mt-10 lg:mt-0">
          <img
            :src="profileImageUrl"
            class="rounded-full my-auto lg:w-60 lg:h-60 h-10 w-10 border-2 border-red-button"
            v-if="profileImageUrl"
          />
          <div class="lg:w-60 lg:h-60 h-10 w-10 rounded-full bg-red-800 justify-center flex" v-else>
            <p class="text-white lg:text-2xl font-normal leading-loose flex my-auto">
              {{ useUserStore().user?.username[0].toUpperCase() }}
            </p>
          </div>
          <div>
            <p class="text-white lg:text-2xl text-xl">{{ useUserStore().user?.username }}</p>
            <p class="text-light-cyan text-sm lg:text-base cursor-pointer" @click="editProfile">
              {{ $t('texts.edit_profile') }}
            </p>
          </div>
        </div>
        <div class="flex flex-row lg:gap-10 gap-7 lg:my-auto" @click="showNewsFeed">
          <IconHouse
            class="w-6 h-6 lg:w-8 lg:h-8 my-auto ml-2"
            :isNewsFeedRoute="isNewsFeedRoute"
          />
          <p class="text-white text-2xl cursor-pointer">{{ $t('texts.news_feed') }}</p>
        </div>
        <div class="flex flex-row lg:gap-10 gap-6 lg:my-auto cursor-pointer" @click="showMovies">
          <IconMovie class="w-6 h-6 lg:w-8 lg:h-8 my-auto ml-3" :isMovieRoute="isMovieRoute" />
          <p class="text-white text-2xl">{{ $t('texts.list_of_movies') }}</p>
        </div>
        <div class="lg:hidden px-2">
          <ButtonSubmitDark :text="$t('auth.log_out')" @click="logOut()" />
        </div>
      </div>
    </section>
    <slot></slot>
  </main>
</template>

<script setup>
import ButtonSubmitDark from '@/components/ui/ButtonSubmitDark.vue'
import { computed, onBeforeUnmount, ref } from 'vue'
import HeaderAuthorized from '@/components/shared/HeaderAuthorized.vue'
import IconHouse from '@/components/icons/profile/IconHouse.vue'
import IconMovie from '@/components/icons/profile/IconMovie.vue'
import { useUserStore } from '@/store/useUserStore'
import { useModalStore } from '@/store/useModalStore'
import router from '@/router/index.js'
import { useRoute } from 'vue-router'
import { logout } from '@/services/auth'
import { useAuthStore } from '@/store/useAuthStore'
import { onClickOutside } from '@vueuse/core'

const route = useRoute()
const burger = ref(null)

const profileImageUrl = computed(() => {
  const thumbnail = useUserStore().user?.thumbnail
  if (thumbnail) {
    return import.meta.env.VITE_API_AUTH_URL + thumbnail
  }
  return null
})

onClickOutside(burger, () => (useModalStore().showBurgerMenu = false))

async function logOut() {
  await logout().then(() => {
    useAuthStore().setIsAuthenticated(false)
    router.push({ name: 'home' })
  })
}

const showMovies = () => {
  router.push({ name: 'movies' })
}

const editProfile = () => {
  router.push({ name: 'profile' })
}

const showNewsFeed = () => {
  router.push({ name: 'news-feed' })
}

const isMovieRoute = computed(() => {
  return route.path.includes('/movies') || route.path.startsWith('/movie/')
})

const isNewsFeedRoute = computed(() => {
  return route.path.includes('/news-feed')
})

onBeforeUnmount(() => {
  if (useModalStore().showBurgerMenu) {
    useModalStore().showBurgerMenu = false
  }
})
</script>
