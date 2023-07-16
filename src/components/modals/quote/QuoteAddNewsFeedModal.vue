<template>
  <LayoutEditModal @close="useModalStore().toggleQuoteAddModal" :title="$t('quotes.add_quote')">
    <template v-slot:body>
      <Form class="flex flex-col gap-6" @submit="quoteAdd">
        <TextareaMovie
          name="content_en"
          placeholder="Start create new quote"
          rules="required|english"
        />
        <TextareaMovie
          name="content_ka"
          placeholder="ახალი ციტატა"
          rules="required|georgian"
          lang="ქარ"
        />

        <InputPhotoUpload name="thumbnail" rules="required" />

        <MovieDropdown rules="required" />

        <ButtonRed class="w-full rounded-lg mt-6 mb-8" :text="$t('quotes.post')" type="submit" />
      </Form>
    </template>
  </LayoutEditModal>
</template>

<script setup>
import LayoutEditModal from '@/components/layouts/LayoutEditModal.vue'
import ButtonRed from '@/components/ui/ButtonRed.vue'
import InputPhotoUpload from '@/components/ui/InputPhotoUpload.vue'
import { Form } from 'vee-validate'
import { createQuote } from '@/services/quotes.js'
import { useModalStore } from '@/store/useModalStore'
import TextareaMovie from '@/components/ui/TextareaMovie.vue'
import MovieDropdown from '@/components/quote/MovieDropdown.vue'

const quoteAdd = async (values) => {
  try {
    await createQuote(values.content_en, values.content_ka, values.thumbnail, values.movie_id).then(
      () => {
        window.location.reload()
      }
    )
  } catch (error) {
    router.push({ name: 'forbidden' })
  }
}
</script>
