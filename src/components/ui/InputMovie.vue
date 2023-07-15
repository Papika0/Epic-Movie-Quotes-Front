<template>
    <div class="flex flex-col gap-2 w-full">
        <Field :name="name" :id="name" :rules="rules" v-slot="{ field, meta }" :value="oldValue">
            <div class="h-12 px-4 py-2 bg-neutral-900 rounded border border-gray-500 items-center flex flex-row gap-2 relative"
                :class="(meta.touched && !meta.valid) ? 'border-red-500' : (meta.touched && meta.valid ? 'border-green-500' : '')">
                <div class="inline-flex gap-2 w-full">
                    <label class="text-gray-500 pt-1 my-auto whitespace-nowrap" :for="name" v-if="edit">{{
                        placeholder }}:</label>
                    <input :type="textType" :name="name" v-bind="field" :disabled="disabled" :id="name"
                        class="text-white lg:text-xl w-full font-normal lg:leading-loose bg-transparent outline-none "
                        :class="{ 'placeholder:text-white': disabled }" :placeholder="placeholder">
                </div>
                <IconInputInvalid :class="[name === 'year' ? 'lg:mr-4' : 'lg:mr-16', 'absolute right-0 hidden lg:block']"
                    v-if="!meta.valid && meta.touched" />
                <IconInputValid :class="[name === 'year' ? 'lg:mr-4' : 'lg:mr-16', 'absolute right-0 hidden lg:block']"
                    v-if="meta.valid && meta.touched" />
                <label :for="name" class="text-gray-500 text-xl font-normal leading-loose" v-if="label">{{ lang }}</label>
            </div>
            <IconInputValid class="absolute right-0 mr-2 mt-4 lg:hidden" v-if="meta.valid && meta.touched" />
            <IconInputInvalid class="absolute right-0 mr-2 mt-4 lg:hidden" v-if="!meta.valid && meta.touched" />
            <ErrorMessage :name="name" class="pl-2 pt-1 text-red-star text-sm" />
        </Field>
    </div>
</template>


<script setup>
import { defineProps } from 'vue';
import { Field, ErrorMessage } from 'vee-validate';
import IconInputInvalid from '@/components/icons/input/IconInputInvalid.vue';
import IconInputValid from '@/components/icons/input/IconInputValid.vue';

defineProps({
    placeholder: {
        type: String,
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
    },
    disabled: {
        type: Boolean,
        default: false,
    }
})


</script>