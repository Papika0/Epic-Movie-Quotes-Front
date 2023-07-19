<template>
  <ModalEditLayout @close="useModalStore().toggleMovieEditModal" :title="$t('movies.edit_movie')">
    <template v-slot:body>
      <Form class="flex flex-col gap-6" @submit="handleSubmit">
        <InputMovie
          name="name_en"
          placeholder="Movie name"
          rules="required|english"
          :edit="true"
          :oldValue="movie.name_en"
        />
        <InputMovie
          name="name_ka"
          placeholder="ფილმის სახელი"
          lang="ქარ"
          rules="required|georgian"
          :edit="true"
          :oldValue="movie.name_ka"
        />

        <GenreDropDown rules="required" :oldValue="movie.genres" />

        <InputMovie
          name="year"
          placeholder="წელი/Year"
          :label="false"
          rules="required|numeric"
          :edit="true"
          :oldValue="movie.release_year"
        />
        <InputMovie
          name="director_en"
          placeholder="Director"
          rules="required|english"
          :edit="true"
          :oldValue="movie.director_en"
        />
        <InputMovie
          name="director_ka"
          placeholder="რეჟისორი"
          lang="ქარ"
          rules="required|georgian"
          :edit="true"
          :oldValue="movie.director_ka"
        />

        <TextareaMovie
          name="description_en"
          placeholder="Movie discription"
          lang="Eng"
          rules="required|english"
          :edit="true"
          :oldValue="movie.description_en"
        />
        <TextareaMovie
          name="description_ka"
          placeholder="ფილმის აღწერა"
          lang="ქარ"
          rules="required|georgian"
          :edit="true"
          :oldValue="movie.description_ka"
        />

        <InputPhotoUpload name="thumbnail" :image="movie.thumbnail" />

        <ButtonSubmitRed type="submit" :text="$t('movies.edit_movie')" class="mb-12 mt-4" />
      </Form>
    </template>
  </ModalEditLayout>
</template>

<script setup>
import ModalEditLayout from '@/components/layouts/ModalEditLayout.vue'
import { useModalStore } from '@/store/useModalStore'
import { Form } from 'vee-validate'
import ButtonSubmitRed from '@/components/ui/ButtonSubmitRed.vue'
import GenreDropDown from '@/components/shared/GenreDropDown.vue'
import InputMovie from '@/components/ui/InputMovie.vue'
import InputPhotoUpload from '@/components/ui/InputPhotoUpload.vue'
import TextareaMovie from '@/components/ui/TextareaMovie.vue'
import { defineProps } from 'vue'
import { updateMovie } from '@/services/movies'

import router from '@/router/index.js'

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const handleSubmit = async (values) => {
  try {
    await updateMovie(
      props.movie.id,
      values.name_en,
      values.name_ka,
      values.genres,
      values.year,
      values.director_en,
      values.director_ka,
      values.description_en,
      values.description_ka,
      values.thumbnail
    ).then(() => {
      window.location.reload()
    })
  } catch (error) {
    router.push({ name: 'forbidden' })
  }
}
</script>
