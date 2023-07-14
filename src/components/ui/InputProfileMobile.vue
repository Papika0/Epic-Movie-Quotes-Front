<template>
    <div class="lg:hidden flex flex-col gap-9 mt-16 mb-6">
        <div class="bg-zinc-800 py-20 px-8">
            <div class="w-5/6 border border-password-div flex flex-col gap-4 pl-6 mb-10" v-if="type === 'password'">
                <p class="text-white mt-6">{{ $t('profile.password_should_contain') }}:</p>
                <div class="flex flex-col gap-1 mb-6">
                    <p class="text-sm text-light-gray">• {{ $t('profile.8_or_more_characters') }} </p>
                    <p class="text-white text-sm">• {{ $t('profile.15_lowercase_letters') }}</p>
                </div>
            </div>
            <InputField :label="label" :name="name" :placeholder="placeholder" :textType="type" :apiError="hasError"
                :rules="rules" />
            <InputField :label="$t('auth.confirm_password')" name="confirm_password" class="mt-10"
                :placeholder="$t('profile.confirm_new_password')" textType="password" rules="required|confirmed:@password"
                v-if="type === 'password'" />
            <p v-if="apiError" class="text-red-star text-sm pt-5">{{ apiError }}</p>
        </div>
        <div class="flex flex-row justify-between mx-8 ">
            <p class="text-light-cyan text-xl my-auto cursor-pointer" @click="cancelEdit">Cancel</p>
            <ButtonRed text="Edit" type="submit" />
        </div>
    </div>
</template>
  
<script setup>
import { defineProps, watch } from 'vue';
import ButtonRed from '@/components/ui/ButtonRed.vue';
import InputField from '@/components/ui/InputField.vue';
import { useModalStore } from '@/stores/useModalStore.js';

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    placeholder: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'text'
    },
    apiError: {
        required: false
    },
    rules: {
        type: String,
        required: true
    },
    cancelEdit: {
        type: Function,
        required: true
    },
    hasError: {
        type: Boolean,
        required: false
    }
})

</script>