<template>
    <div class="flex flex-col gap-2">
        <div class="px-4 py-4 bg-neutral-900 rounded border border-gray-500 relative" @dragover.prevent="handleDragOver"
            @dragleave="handleDragLeave" @drop.prevent="handleDrop"
            :class="{ ' border-2 border-dashed border-blue-300': isDragOver }">
            <div class="ml-4 justify-start items-center gap-4 inline-flex">
                <div class="justify-start items-center gap-2 flex">
                    <IconMovieUpload class="w-6 h-6 relative" />
                    <p class="text-white text-xl font-normal leading-loose">
                        Drag & drop your image here or
                    </p>
                </div>
                <label :for="name"
                    class="p-2.5 bg-purple-500 bg-opacity-40 rounded-sm justify-start items-center gap-1 flex cursor-pointer">
                    <div class="text-white text-lg leading-snug">Choose file</div>
                    <Field :name="name" :id="name" :rules="rules" v-model="file">
                        <input :name="name" :id="name" type="file" class="hidden" @change="handleFileChange" />
                    </Field>
                </label>
            </div>
        </div>
        <ErrorMessage :name="name" class="text-red-star mt-1 text-sm pl-2" />
    </div>
</template>
  
<script setup>
import { defineProps, ref } from 'vue';
import { Field, ErrorMessage } from 'vee-validate';
import IconMovieUpload from '@/components/icons/movie/IconMovieUpload.vue';

defineProps({
    name: {
        type: String,
        required: true,
    },
    rules: {
        type: String,
        default: '',
        required: true,
    },
});

const file = ref(null);
const isDragOver = ref(false);

const handleFileChange = (event) => {
    file.value = event.target.files[0];
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
};
</script>
  