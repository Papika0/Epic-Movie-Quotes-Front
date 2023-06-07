<template>
    <div class="flex flex-col">
        <label :for="name" class="text-white mb-2">{{ label }} <span class=" text-red-star">
                *</span></label>
        <div class="relative">
            <Field :type="inputType" :placeholder="placeholder" :name="name" :label="label"
                class="h-10 bg-input border border-input pl-3 placeholder:text-placeholder rounded-md w-full" />
            <IconPasswordEye v-if="textType === 'password'"
                class="absolute right-3 top-2/4 transform -translate-y-2/4 cursor-pointer"
                @click="togglePasswordVisibility" />
        </div>
        <ErrorMessage :name="name" class="text-red-500 mt-2 pl-5 text-sm" />
    </div>
</template>


<script>
import { Field, ErrorMessage } from 'vee-validate';
import IconPasswordEye from '@/components/icons/IconPasswordEye.vue';

export default {
    components: {
        Field,
        ErrorMessage,
        IconPasswordEye
    },
    props: {
        label: {
            String,
            required: false
        },
        placeholder: {
            type: String,
            required: true
        },
        name: {
            String,
            required: true
        },
        textType: {
            type: String,
            default: "text"
        },
    },
    data() {
        return {
            inputType: this.textType
        };
    },
    methods: {
        togglePasswordVisibility() {
            this.inputType = this.inputType === "password" ? "text" : "password";
        }
    }
};
</script>
