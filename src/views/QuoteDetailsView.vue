<template>
  <FeedLayout>
    <QuoteModalView :id="id" v-if="type === 'view'" />
    <QuoteModalEdit :id="id" v-if="type === 'edit'" />
    <QuoteModalAdd :id="id" v-if="type === 'add'" />
  </FeedLayout>
</template>

<script setup>
import { defineProps } from 'vue'

import FeedLayout from '@/components/layouts/FeedLayout.vue'
import QuoteModalView from '@/components/quote/QuoteModalView.vue'
import QuoteModalEdit from '@/components/quote/QuoteModalEdit.vue'
import QuoteModalAdd from '@/components/quote/QuoteModalAdd.vue'

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
