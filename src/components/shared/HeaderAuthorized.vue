<template>
  <div class="absolute w-full h-4/5 bg-neutral-900 z-50 flex flex-col gap-6" v-if="showSearch">
    <div class="h-16 border-b border-zinc-100 border-opacity-30 flex flex-row gap-5">
      <IconArrowBack class="my-auto ml-6" @click="showSearch = false" />
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search"
        class="px-2 w-full text-white my-auto bg-transparent outline-none placeholder:text-white"
        @keydown.enter="showSearch = false"
      />
    </div>
    <p class="text-gray-300 text-opacity-60 ml-20">
      Enter <span class="text-white">@</span> to search movies
    </p>
    <p class="text-gray-300 text-opacity-60 ml-20">
      Enter <span class="text-white">#</span> to search quotes
    </p>
  </div>
  <nav class="bg-header h-86">
    <header class="flex lg:flex-row flex-row justify-between lg:mx-16 mx-9 lg:pt-6 pt-8">
      <IconBurgerMenu class="lg:hidden my-auto" @click="useModalStore().toggleBurgerMenu()" />
      <p class="text-header my-auto lg:block hidden" @click="router.push({ name: 'home' })">
        MOVIE QUOTES
      </p>
      <div class="flex lg:flex-row flex-row-reverse gap-4 my-auto">
        <NotificationsDropDown />
        <IconSearch
          class="my-auto lg:hidden w-6 h-6"
          v-if="isNewsFeedRoute"
          @click="showSearch = true"
        />
        <LanguageDropDown />
        <ButtonSubmitDark :text="$t('auth.log_out')" @click="logOut()" class="lg:block hidden" />
      </div>
    </header>
  </nav>
</template>

<script setup>
import ButtonSubmitDark from '@/components/ui/ButtonSubmitDark.vue'
import IconSearch from '@/components/icons/movie/IconSearch.vue'
import IconArrowBack from '@/components/icons/header/IconArrowBack.vue'
import LanguageDropDown from '@/components/shared/LanguageDropDown.vue'
import NotificationsDropDown from '@/components/shared/NotificationsDropDown.vue'
import IconBurgerMenu from '@/components/icons/header/IconBurgerMenu.vue'
import { logout } from '@/services/auth'
import { useAuthStore } from '@/store/useAuthStore'
import { useModalStore } from '@/store/useModalStore'
import { useNewsFeedStore } from '@/store/useNewsFeedStore'
import router from '@/router/index.js'
import { useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'

const route = useRoute()
const searchQuery = ref('')
const showSearch = ref(false)

watch(searchQuery, () => {
  useNewsFeedStore().searchValue = searchQuery.value
})

async function logOut() {
  await logout().then(() => {
    useAuthStore().setIsAuthenticated(false)
    router.push({ name: 'home' })
  })
}

const isNewsFeedRoute = computed(() => {
  return route.path.includes('/news-feed')
})
</script>
