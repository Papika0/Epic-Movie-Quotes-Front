<template>
    <div class="flex flex-col gap-2">
        <Field :name="name" :id="name" :rules="rules" v-model="file" v-slot="{ meta }">
            <input :name="name" :id="name" type="file" class="hidden" @change="handleFileChange" />
            <div class=" bg-neutral-900 rounded border border-gray-500 " @dragover.prevent="handleDragOver"
                @dragleave="handleDragLeave" @drop.prevent="handleDrop" :class="[
                    isDragOver ? 'border-2 border-dashed border-blue-300' : '',
                    showPhoto ? 'px-6 py-5 flex flex-row gap-16 items-center' : 'px-4 py-4 relative',
                    meta.touched && !meta.valid ? 'border-red-500' : (meta.touched && meta.valid ? 'border-green-500' : '')
                ]">
                <img :src="imageURL" class="w-[433px] h-[147px] object-cover" v-if="showPhoto" />
                <div class="ml-4 justify-start items-center gap-4"
                    :class="{ 'flex flex-col': showPhoto, 'ml-4 justify-start inline-flex': !showPhoto }">
                    <p v-if="showPhoto" class="text-orange-200 font-bold uppercase leading-normal">{{
                        $t('movies.replace_photo')
                    }}</p>
                    <div class="justify-start items-center gap-2 flex">
                        <IconMovieUpload class="w-6 h-6 relative" />
                        <p class="text-white text-xl font-normal leading-loose">
                            Drag & drop your image here or
                        </p>
                    </div>
                    <label :for="name"
                        class="p-2.5 bg-purple-500 bg-opacity-40 rounded-sm justify-start items-center gap-1 flex cursor-pointer">
                        <p class="text-white text-lg leading-snug">{{ $t('movies.choose_file') }}</p>
                    </label>
                </div>
            </div>
        </Field>
        <ErrorMessage :name="name" class="text-red-star mt-1 text-sm pl-2" />
    </div>
</template>
  
<script setup>
import { defineProps, ref, watch, onMounted, computed } from 'vue';
import { Field, ErrorMessage } from 'vee-validate';
import IconMovieUpload from '@/components/icons/movie/IconMovieUpload.vue';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    rules: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
});

const file = ref(null);
const isDragOver = ref(false);
const imageURL = ref('');

const showPhoto = computed(() => {
    return Boolean(file.value) || props.image.length > 0;
});

const handleFileChange = (event) => {
    file.value = event.target.files[0];
    displayImage();
};

const handleDragOver = () => {
    isDragOver.value = true;
};

const handleDragLeave = () => {
    isDragOver.value = false;
};

const handleDrop = (event) => {
    isDragOver.value = false;
    file.value = event.dataTransfer.files[0];
    displayImage();
};

const displayImage = () => {
    if (file.value) {
        imageURL.value = URL.createObjectURL(file.value);
    } else if (props.image.length > 0) {
        imageURL.value = import.meta.env.VITE_API_AUTH_URL + props.image;
    }
    else {
        imageURL.value = '';
    }
};

watch(file, displayImage);

onMounted(() => {
    displayImage();
});
</script>