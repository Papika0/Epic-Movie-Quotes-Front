<template>
  <div class="fixed top-0 mt-32 left-0 right-0 flex items-center justify-center">
    <div
      class="fixed inset-0 backdrop-filter backdrop-blur-sm z-50 bg-opacity-75 bg-outside-modal"
    ></div>
    <div
      class="relativ bg-gradient-to-b from-gray-900 via-gray-900 to-zinc-950 rounded-xl z-50"
      ref="modalContentRef"
    >
      <div class="mt-16 pb-11 border-b border-gray-300 border-opacity-20 px-8">
        <p class="text-white text-base font-normal leading-normal">
          Are you sure to make changes ?
        </p>
      </div>
      <div class="flex flex-row justify-between mx-8 my-5">
        <p class="text-gray-300 my-auto cursor-pointer" @click="useModalStore().toggleProfileModal">
          Cancel
        </p>
        <ButtonSubmitRed text="Edit" type="submit" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue'
import ButtonSubmitRed from '@/components/ui/ButtonSubmitRed.vue'
import { useModalStore } from '@/store/useModalStore.js'
import { onClickOutside } from '@vueuse/core'

const emit = defineEmits(['close'])
const modalContentRef = ref(null)

onClickOutside(modalContentRef, () => emit('close'))
</script>
