<template>
  <ModalEditLayout @close="closeModal" :title="$t('quotes.edit_quote')">
    <template v-slot:header>
      <div class="flex flex-row gap-2 absolute mt-9 cursor-pointer" @click="handleDelete">
        <IconDelete class="ml-10" />
        <p class="text-gray-300 leading-normal pt-1px hidden lg:block">{{ $t('quotes.delete') }}</p>
      </div>
    </template>
    <template v-slot:body>
      <Form class="flex flex-col gap-4" @submit="handleSubmit">
        <TextareaMovie
          name="content_en"
          :oldValue="quote.content_en"
          placeholder="Quote"
          rules="required|english"
        />
        <TextareaMovie
          name="content_ka"
          :oldValue="quote.content_ka"
          placeholder="ციტატა"
          rules="required|georgian"
          lang="ქარ"
        />

        <div class="relative">
          <img
            :src="quoteThumbnail"
            alt="thumbnail"
            class="w-900 lg:h-513px h-302px rounded-lg mt-2"
          />
          <label
            for="thumbnail"
            class="w-135 h-84px absolute opacity-80 bg-gradient-to-b from-gray-900 via-gray-900 to-zinc-950 rounded-lg flex flex-col gap-2 items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <IconMovieUpload class="w-5 h-5 relative" />
            <div class="text-white leading-normal">{{ $t('quotes.change_photo') }}</div>
            <Field name="thumbnail" id="thumbnail" v-model="file">
              <input
                name="thumbnail"
                id="thumbnail"
                type="file"
                class="hidden"
                @change="handleFileChange"
              />
            </Field>
          </label>
        </div>

        <ButtonRed
          class="w-full rounded-lg mt-6 mb-5"
          :text="$t('quotes.edit_quote')"
          type="submit"
        />
      </Form>
    </template>
  </ModalEditLayout>
</template>

<script setup>
import ModalEditLayout from '@/components/layouts/ModalEditLayout.vue'
import IconDelete from '@/components/icons/IconDelete.vue'
import IconMovieUpload from '@/components/icons/movie/IconMovieUpload.vue'
import ButtonRed from '@/components/ui/ButtonRed.vue'
import { Form, Field } from 'vee-validate'
import { defineProps, ref, watchEffect, onBeforeMount } from 'vue'
import { updateQuote } from '@/services/quotes.js'
import { getQuote, deleteQuote } from '@/services/quotes.js'

import router from '@/router/index.js'
import TextareaMovie from '@/components/ui/TextareaMovie.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const file = ref(null)
const quoteThumbnail = ref('')

const handleFileChange = (event) => {
  file.value = event.target.files[0]
}

const quote = ref([])

const handleDelete = async () => {
  try {
    await deleteQuote(props.id).then(() => {
      router.push({ name: 'movie-details', params: { id: quote.value.movie_id } })
    })
  } catch (error) {
    router.push({ name: 'forbidden' })
  }
}

onBeforeMount(async () => {
  try {
    const data = await getQuote(props.id)
    quote.value = data
  } catch (error) {
    router.push({ name: 'forbidden' })
  }
})

const closeModal = () => {
  router.push({ name: 'movie-details', params: { id: quote.value.movie_id } })
}

const handleSubmit = async (values) => {
  try {
    await updateQuote(props.id, values.content_en, values.content_ka, values.thumbnail).then(() => {
      router.push({ name: 'quote-details', params: { id: props.id, type: 'view' } })
    })
  } catch (error) {
    router.push({ name: 'forbidden' })
  }
}

watchEffect(() => {
  quoteThumbnail.value = file.value
    ? URL.createObjectURL(file.value)
    : import.meta.env.VITE_API_AUTH_URL + quote.value.thumbnail
})
</script>
