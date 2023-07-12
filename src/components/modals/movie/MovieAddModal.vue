<template>
    <LayoutEditModal @close="useModalStore().toggleMovieAddModal" :title="$t('movies.add_movie')">
        <template v-slot:body>
            <Form class="flex flex-col gap-6" @submit="createMovieOnSubmit">
                <InputMovie name="name_en" placeholder="Movie name" rules="required|english" />
                <InputMovie name="name_ka" placeholder="ფილმის სახელი" lang="ქარ" rules="required|georgian" />

                <GenreDropDown rules="required" />

                <InputMovie name="year" placeholder="Year" :label="false" rules="required|numeric" />
                <InputMovie name="director_en" placeholder="Director" rules="required|english" />
                <InputMovie name="director_ka" placeholder="რეჟისორი" lang="ქარ" rules="required|georgian" />

                <TextareaMovie name="description_en" placeholder="Movie discription" lang="Eng" rules="required|english" />
                <TextareaMovie name="description_ka" placeholder="ფილმის აღწერა" lang="ქარ" rules="required|georgian" />

                <InputPhotoUpload name="thumbnail" rules="required" />

                <ButtonRed type="submit" :text="$t('movies.add_movie')" class="mb-12 mt-4" />
            </Form>
        </template>
    </LayoutEditModal>
</template>


<script setup>
import LayoutEditModal from '@/components/layouts/LayoutEditModal.vue';
import { useModalStore } from '@/stores/useModalStore';
import { Form } from 'vee-validate';
import ButtonRed from '@/components/ui/ButtonRed.vue';
import GenreDropDown from '@/components/shared/GenreDropDown.vue';
import InputMovie from '@/components/ui/InputMovie.vue';
import InputPhotoUpload from '@/components/ui/InputPhotoUpload.vue';
import TextareaMovie from '@/components/ui/TextareaMovie.vue';
import { createMovie } from '@/services/movies.js';

const createMovieOnSubmit = async (values) => {
    await createMovie(values.name_en, values.name_ka,
        values.genres, values.year,
        values.director_en, values.director_ka,
        values.description_en, values.description_ka,
        values.thumbnail).then(() => {
            window.location.reload();
        })
};


</script>