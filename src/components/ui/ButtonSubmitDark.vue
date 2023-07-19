<template>
  <button
    type="button"
    :disabled="disabled"
    class="px-4 py-2 lg:px-6 text-white rounded border border-white flex gap-2 items-center justify-center"
  >
    <span class="justify-center text-center items-center" v-if="gmail">
      <IconGmailLogo />
    </span>
    {{ text }}
  </button>
</template>

<script setup>
import IconGmailLogo from '@/components/icons/input/IconGmailLogo.vue'

defineProps({
  text: {
    type: String,
    required: true
  },
  gmail: {
    type: Boolean,
    required: false,
    default: false
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>
