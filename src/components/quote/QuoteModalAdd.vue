<template>
  <ModalEditLayout @close="closeModal" :title="$t('quotes.add_quote')">
    <template v-slot:body>
      <Form class="flex flex-col gap-6" @submit="handleSubmit">
        <div class="flex lg:flex-row flex-col gap-5">
          <img :src="movieThumbnail" class="w-290 h-158px rounded-xl border object-cover -z-50" />

          <div class="flex flex-col gap-5">
            <div class="flex flex-row justify-between">
              <p class="text-orange-200 text-2xl my-auto font-medium lowercase leading-9">
                {{ movie.name }} ({{ movie.release_year }})
              </p>
            </div>

            <div class="flex flex-wrap gap-2 mt-1 max-w-xl">
              <div
                v-for="option in movie.genres"
                :key="option.id"
                class="rounded-md items-center py-6px px-3 bg-gray-500"
              >
                <p class="text-white text-sm font-normal leading-snug">{{ option.name }}</p>
              </div>
            </div>

            <div class="inline-flex gap-2">
              <p class="text-gray-300 text-lg font-bold leading-relaxed">
                {{ $t('movies.director') }}:
              </p>
              <p class="text-white text-lg font-medium leading-relaxed">{{ movie.director }}</p>
            </div>
          </div>
        </div>
        <TextareaMovie
          name="content_en"
          placeholder="“Quote in English.”"
          rules="required|english"
        />
        <TextareaMovie
          name="content_ka"
          placeholder="“ციტატა ქართულ ენაზე”"
          rules="required|georgian"
          lang="ქარ"
        />

        <InputPhotoUpload name="thumbnail" rules="required" />

        <ButtonSubmitRed
          class="w-full rounded-lg mt-6 mb-8"
          :text="$t('quotes.add_quote')"
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
import { defineProps, ref, onBeforeMount, computed } from 'vue'
import { getMovie } from '@/services/movies.js'
import { createQuote } from '@/services/quotes.js'

import router from '@/router/index.js'
import TextareaMovie from '@/components/ui/TextareaMovie.vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const movie = ref([])

const closeModal = () => {
  router.push({ name: 'movie-details', params: { id: movie.value.id } })
}

const handleSubmit = async (values) => {
  try {
    await createQuote(values.content_en, values.content_ka, values.thumbnail, movie.value.id)
    router.push({ name: 'movie-details', params: { id: movie.value.id } })
  } catch (error) {
    router.push({ name: 'forbidden' })
  }
}

const movieThumbnail = computed(() => import.meta.env.VITE_API_AUTH_URL + movie.value.thumbnail)

onBeforeMount(async () => {
  try {
    const res = await getMovie(props.id)
    movie.value = res.data
  } catch (error) {
    router.push({ name: 'forbidden' })
  }
})
</script>
