<template>
    <div class="flex flex-col gap-2">
        <div class=" px-4 py-2 bg-neutral-900 rounded border border-gray-500 relative">
            <div class="inline-flex gap-2 w-full">
                <label class="text-gray-500 pt-2 whitespace-nowrap " :for="name" v-if="edit">{{
                    placeholder }} :</label>
                <Field :name="name" :id="name" :rules="rules" v-model="value">
                    <textarea :name="name" :id="name" v-model="value"
                        class="text-white text-xl w-full font-normal z-20 leading-loose bg-transparent outline-none "
                        :placeholder="placeholder"></textarea>
                </Field>
            </div>
            <label :for="name"
                class="text-gray-500 text-xl font-normal leading-loose absolute pr-4 top-0 right-0 pointer-events-none">{{
                    lang
                }}</label>
        </div>
        <ErrorMessage :name="name" class="pl-2 text-red-star mt-1 text-sm" />
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted, watch } from 'vue';
import { Field, ErrorMessage } from 'vee-validate';

const props = defineProps({
    placeholder: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lang: {
        type: String,
        default: "Eng",
    },
    rules: {
        type: String,
        default: "",
        required: true,
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

const value = ref('');

watch(() => props.oldValue, (newValue) => {
    value.value = newValue;
});

onMounted(() => {
    value.value = props.oldValue;
});

</script>