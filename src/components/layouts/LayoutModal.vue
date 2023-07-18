<template>
  <div class="fixed top-0 left-0 right-0 bottom-0 flex items-center z-50 justify-center">
    <div
      class="fixed inset-0 backdrop-filter backdrop-blur-sm z-50 bg-opacity-75 bg-outside-modal"
    ></div>
    <div
      class="relative lg:bg-gray-800 bg-gradient-to-b from-gray-900 via-gray-900 to-zinc-950 lg:rounded-xl lg:h-fit lg:px-120 px-8 z-50 overflow-y-auto"
      :class="[
        small
          ? 'lg:px-20 sm:h-fit rounded-xl w-5/6 h-fit lg:max-w-540 '
          : 'w-full max-w-xl h-screen'
      ]"
      ref="modalContentRef"
    >
      <button v-if="!small" class="absolute right-0 mt-5 mr-4 lg:hidden" @click="emit('close')">
        <IconCloseX class="w-8 h-8" />
      </button>
      <div
        class="flex flex-col gap-3 items-center justify-between mb-6 mt-14"
        :class="small && 'mb-8 mt-72'"
      >
        <slot name="header"></slot>
      </div>
      <div class="flex flex-col gap-4">
        <slot name="body"></slot>
      </div>
      <div class="mt-8 mb-14 flex gap-1" :class="small && 'mt-10 mb-16'">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref } from 'vue'
import IconCloseX from '@/components/icons/movie/IconCloseX.vue'
import { onClickOutside } from '@vueuse/core'

const emit = defineEmits(['close'])
const modalContentRef = ref(null)

defineProps({
  small: {
    type: Boolean,
    default: false
  }
})

onClickOutside(modalContentRef, () => emit('close'))
</script>
