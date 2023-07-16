<template>
  <div class="relative my-auto">
    <div
      class="flex items-center cursor-pointer w-full bg-black h-86px px-5"
      @click="toggleDropdown"
    >
      <div v-if="showPlaceholder" class="inline-flex gap-4">
        <IconMovie class="w-8 h-8 my-auto" />
        <p class="text-white text-2xl leading-loose">Choose movie</p>
      </div>
      <div v-else class="inline-flex gap-4">
        <img
          :src="movieThumbnail(selectedOptionThumbnail)"
          class="w-150px h-70px rounded-xl object-cover"
        />
        <span class="text-white my-auto">{{ selectedOption }}</span>
      </div>
      <Field name="movie_id" type="hidden" :rules="rules" v-model="selected" />
      <IconDropdownArrow
        class="absolute right-0 w-5 h-6 mr-5"
        :class="{ 'rotate-180': isDropdownOpen }"
      />
    </div>
    <ul
      v-if="isDropdownOpen"
      class="absolute mt-3 left-0 w-full bg-black py-2 rounded border border-gray-500 shadow-md overflow-y-scroll"
    >
      <li
        v-for="option in options"
        :key="option.id"
        @click.stop="selectOption(option)"
        class="cursor-pointer w-full inline-flex gap-8 hover:bg-gray-500 py-2 px-4 text-white"
      >
        <img
          :src="movieThumbnail(option.thumbnail)"
          class="lg:w-150px h-70px w-90px rounded-xl object-cover"
        />
        <p class="my-auto text-2xl">{{ option.label }}</p>
      </li>
    </ul>
    <ErrorMessage name="movie_id" class="pl-2 pt-1 text-red-star text-sm" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { getAllMovies } from '@/services/movies.js'
import IconDropdownArrow from '@/components/icons/header/IconDropdownArrow.vue'
import IconMovie from '@/components/icons/profile/IconMovie.vue'
import { ref, computed, defineProps, onBeforeMount } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineProps({
  rules: {
    type: String,
    default: '',
    required: true
  }
})

const isDropdownOpen = ref(false)

onClickOutside(isDropdownOpen, () => (isDropdownOpen.value = false))

const options = ref([])

const selected = ref(null)

const selectedOption = computed(() => {
  return options.value.find((option) => option.id === selected.value)?.label
})

const selectedOptionThumbnail = computed(() => {
  return options.value.find((option) => option.id === selected.value)?.thumbnail
})

const showPlaceholder = computed(() => {
  return selected.value === null
})

const movieThumbnail = (thumbnail) => import.meta.env.VITE_API_AUTH_URL + thumbnail

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectOption = (option) => {
  selected.value = option.id
  isDropdownOpen.value = false
}

onBeforeMount(async () => {
  await getAllMovies().then((res) => {
    options.value = res.map((movie) => {
      return {
        id: movie.id,
        label: movie.name,
        thumbnail: movie.thumbnail
      }
    })
  })
})
</script>
