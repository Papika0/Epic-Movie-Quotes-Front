<template>
    <div class="flex flex-col">
        <label :for="name" class="text-white mb-2">{{ label }} <span class=" text-red-star">
                *</span></label>
        <div class="relative">
            <Field :name="name" :rules="rules" v-slot="{ field, meta }">
                <input :type="inputType" :placeholder="placeholder" v-bind="field"
                    class="h-10 bg-input border border-input pl-3 placeholder:text-placeholder rounded-md w-full outline-none focus:shadow-input"
                    :class="meta.touched && !meta.valid ? 'border-red-500' : (meta.touched && meta.valid ? 'border-green-500' : '')">
                <IconPasswordEye v-if="textType === 'password'"
                    class="absolute right-3 top-2/4 transform -translate-y-2/4 cursor-pointer"
                    :class="meta.touched && (meta.valid || !meta.valid) && 'right-9'" @click="togglePasswordVisibility" />
                <IconInputInvalid class="absolute right-3 top-2/4 transform -translate-y-2/4"
                    v-if="!meta.valid && meta.touched" />
                <IconInputValid class="absolute right-3 top-2/4 transform -translate-y-2/4"
                    v-if="meta.valid && meta.touched" />
            </Field>
        </div>
        <ErrorMessage :name="name" class="text-red-star mt-1 text-sm" v-bind="" />
    </div>
</template>


<script>
import { Field, ErrorMessage, useField } from 'vee-validate';
import IconPasswordEye from '@/components/icons/IconPasswordEye.vue';
import IconInputInvalid from '@/components/icons/IconInputInvalid.vue';
import IconInputValid from '@/components/icons/IconInputValid.vue';

export default {
    components: {
        Field,
        ErrorMessage,
        IconPasswordEye,
        IconInputInvalid,
        IconInputValid
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
        rules: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            inputType: this.textType,
        };
    },
    methods: {
        togglePasswordVisibility() {
            this.inputType = this.inputType === "password" ? "text" : "password";
        },
    }
};
</script>
