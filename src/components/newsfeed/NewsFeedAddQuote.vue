<template>
  <ModalEditLayout @close="useModalStore().toggleQuoteAddModal" :title="$t('quotes.add_quote')">
    <template v-slot:body>
      <Form class="flex flex-col gap-6" @submit="handleSubmit">
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

        <QuoteMovieDropdown rules="required" />

        <ButtonSubmitRed
          class="w-full rounded-lg mt-6 mb-8"
          :text="$t('quotes.post')"
          type="submit"
        />
      </Form>
    </template>
  </ModalEditLayout>
</template>

<script setup>
import ModalEditLayout from '@/components/layouts/ModalEditLayout.vue'
import ButtonSubmitRed from '@/components/ui/ButtonSubmitRed.vue'
import InputPhotoUpload from '@/components/ui/InputPhotoUpload.vue'
import { Form } from 'vee-validate'
import { createQuote } from '@/services/quotes.js'
import { useModalStore } from '@/store/useModalStore'
import TextareaMovie from '@/components/ui/TextareaMovie.vue'
import QuoteMovieDropdown from '@/components/quote/QuoteMovieDropdown.vue'
import router from '@/router/index.js'

const handleSubmit = async (values) => {
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
