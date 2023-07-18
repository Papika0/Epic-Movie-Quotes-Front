<template>
  <div class="fixed top-0 left-0 right-0 lg:mt-120px flex items-center z-50 justify-center">
    <div
      class="fixed inset-0 backdrop-filter backdrop-blur-sm z-50 bg-opacity-75 bg-outside-modal"
    ></div>
    <div
      class="relative lg:max-h-800 max-h-screen overflow-y-scroll bg-neutral-900 lg:rounded-xl w-full z-50 max-w-960"
      ref="modalContentRef"
    >
      <div class="mb-6 h-92px border-b border-zinc-100 border-opacity-20 flex flex-row relative">
        <slot name="header"></slot>
        <p class="text-white text-2xl font-medium leading-9 text-center mx-auto my-auto">
          {{ title }}
        </p>
        <button class="mr-8 absolute right-0 bottom-0 top-0" @click="emit('close')">
          <IconCloseX class="w-8 h-8 relative" />
        </button>
      </div>
      <div class="px-8">
        <div class="flex flex-row gap-4 mb-7">
          <img :src="profileImageUrl" class="rounded-full w-60 h-60" v-if="profileImageUrl" />
          <div class="w-60 h-60 rounded-full bg-red-800 justify-center flex" v-else>
            <p class="text-white lg:text-2xl font-normal leading-loose flex my-auto">
              {{ useUserStore().user?.username[0].toUpperCase() }}
            </p>
          </div>
          <p class="text-white text-xl my-auto leading-loose">
            {{ useUserStore().user?.username }}
          </p>
        </div>

        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref, computed } from 'vue'
import IconCloseX from '@/components/icons/movie/IconCloseX.vue'
import { useUserStore } from '@/store/useUserStore'
import { onClickOutside } from '@vueuse/core'

const profileImageUrl = computed(() => {
  const thumbnail = useUserStore().user?.thumbnail
  if (thumbnail) {
    return import.meta.env.VITE_API_AUTH_URL + thumbnail
  }
  return null
})

defineProps({
  title: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])

const modalContentRef = ref(null)

onClickOutside(modalContentRef, () => emit('close'))
</script>
