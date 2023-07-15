<template>
    <div class="flex flex-col gap-2">
        <Field :name="name" :id="name" :rules="rules" v-model="value" v-slot="{ field, meta }">
            <div class=" px-4 py-2 bg-neutral-900 rounded border border-gray-500 relative"
                :class="(meta.touched && !meta.valid) ? 'border-red-500' : (meta.touched && meta.valid ? 'border-green-500' : '')">
                <div class="lg:flex-row flex flex-col gap-2 w-full">
                    <label class="text-gray-500 pt-2 whitespace-nowrap " :for="name" v-if="edit">{{
                        placeholder }} :</label>

                    <textarea :name="name" :id="name" v-model="value" v-bind="field"
                        class="text-white lg:text-xl w-full font-normal z-20 lg:leading-loose bg-transparent outline-none lg:pr-20"
                        :placeholder="placeholder"></textarea>
                </div>
                <IconInputInvalid class="absolute right-0 top-0 transform translate-y-2/3 mr-16 hidden lg:block"
                    v-if="!meta.valid && meta.touched" />
                <IconInputValid class="absolute right-0 top-0 bottom-0 transform translate-y-2/3 mr-16 hidden lg:block"
                    v-if="meta.valid && meta.touched" />
                <label :for="name"
                    class="text-gray-500 text-xl font-normal leading-loose absolute pr-4 top-0 right-0 pointer-events-none">{{
                        lang
                    }}</label>
            </div>
            <IconInputValid class="absolute right-0 mr-2 mt-10 lg:hidden" v-if="meta.valid && meta.touched" />
            <IconInputInvalid class="absolute right-0 mr-2 mt-10 lg:hidden" v-if="!meta.valid && meta.touched" />
            <ErrorMessage :name="name" class="pl-2 text-red-star mt-1 text-sm" />
        </Field>
    </div>
</template>

<script setup>
import { defineProps, ref, onMounted, watch } from 'vue';
import { Field, ErrorMessage } from 'vee-validate';
import IconInputInvalid from '@/components/icons/input/IconInputInvalid.vue';
import IconInputValid from '@/components/icons/input/IconInputValid.vue';


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