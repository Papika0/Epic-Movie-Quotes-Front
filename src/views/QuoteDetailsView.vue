<template>
  <FeedLayout>
    <ModalViewQuote :id="id" v-if="type === 'view'" />
    <ModalEditQuote :id="id" v-if="type === 'edit'" />
    <ModalAddQuote :id="id" v-if="type === 'add'" />
  </FeedLayout>
</template>

<script setup>
import { defineProps } from 'vue'

import FeedLayout from '@/components/layouts/FeedLayout.vue'
import ModalViewQuote from '@/components/quote/ModalViewQuote.vue'
import ModalEditQuote from '@/components/quote/ModalEditQuote.vue'
import ModalAddQuote from '@/components/quote/ModalAddQuote.vue'

defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})
</script>
