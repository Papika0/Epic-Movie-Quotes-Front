<template>
    <div class="flex flex-col gap-2 relative">
        <Field :name="name" :id="name" :rules="rules" v-slot="{ field, meta }" :value="oldValue">
            <div class="h-12 px-4 py-2 bg-neutral-900 rounded border border-gray-500 items-center flex flex-row justify-between"
                :class="(meta.touched && !meta.valid) ? 'border-red-500' : (meta.touched && meta.valid ? 'border-green-500' : '')">
                <div class="inline-flex gap-2">
                    <label class="text-gray-500 pt-1 my-auto whitespace-nowrap" :for="name" v-if="edit">{{
                        placeholder }}:</label>
                    <input :type="textType" :name="name" v-bind="field" :disabled="disabled"
                        class="text-white text-xl w-550 font-normal leading-loose bg-transparent outline-none "
                        :class="{ 'placeholder:text-white': disabled }" :placeholder="placeholder">
                </div>
                <IconInputInvalid :class="[name === 'year' ? 'mr-4' : 'mr-16', 'absolute right-0']"
                    v-if="!meta.valid && meta.touched" />
                <IconInputValid :class="[name === 'year' ? 'mr-4' : 'mr-16', 'absolute right-0']"
                    v-if="meta.valid && meta.touched" />
                <label :for="name" class="text-gray-500 text-xl font-normal leading-loose" v-if="label">{{ lang }}</label>
            </div>
            <ErrorMessage :name="name" class="pl-2 pt-1 text-red-star text-sm" />
        </Field>
    </div>
</template>


<script setup>
import { defineProps } from 'vue';
import { Field, ErrorMessage } from 'vee-validate';
import IconInputInvalid from '@/components/icons/IconInputInvalid.vue';
import IconInputValid from '@/components/icons/IconInputValid.vue';

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