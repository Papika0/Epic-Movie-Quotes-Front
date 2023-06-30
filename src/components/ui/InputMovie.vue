<template>
    <div class="flex flex-col gap-2">
        <div
            class="h-12 px-4 py-2 bg-neutral-900 rounded border border-gray-500 items-center flex flex-row justify-between">
            <div class="inline-flex gap-2">
                <label class="text-gray-500 pt-1 my-auto whitespace-nowrap" :for="name" v-if="edit">{{
                    placeholder }}:</label>
                <Field :type="textType" :name="name" :id="name" :rules="rules" :value="oldValue"
                    class="text-white text-xl w-full font-normal leading-loose bg-transparent outline-none"
                    :placeholder="placeholder" />
            </div>
            <label :for="name" class="text-gray-500 text-xl font-normal leading-loose" v-if="label">{{ lang }}</label>
        </div>
        <ErrorMessage :name="name" class="pl-2 pt-1 text-red-star text-sm" />
    </div>
</template>


<script setup>
import { defineProps } from 'vue';
import { Field, ErrorMessage } from 'vee-validate';

defineProps({
    placeholder: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    label: {
        type: Boolean,
        default: true,
    },
    rules: {
        type: String,
        default: "",
        required: true,
    },
    lang: {
        type: String,
        default: "Eng",
    },
    textType: {
        type: String,
        default: "text"
    },
    edit: {
        type: Boolean,
        default: false,
    },
    oldValue: {
        type: String,
        default: "",
    }
})


</script>