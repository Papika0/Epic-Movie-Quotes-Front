<template>
  <FeedLayout>
    <QuoteViewModal :id="id" v-if="type === 'view'" />
    <QuoteEditModal :id="id" v-if="type === 'edit'" />
    <QuoteAddModal :id="id" v-if="type === 'add'" />
  </FeedLayout>
</template>

<script setup>
import { defineProps } from 'vue'

import FeedLayout from '@/components/layouts/FeedLayout.vue'
import QuoteViewModal from '@/components/modals/quote/QuoteViewModal.vue'
import QuoteEditModal from '@/components/modals/quote/QuoteEditModal.vue'
import QuoteAddModal from '@/components/modals/quote/QuoteAddModal.vue'

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
