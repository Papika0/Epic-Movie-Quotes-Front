<template>
    <button class="py-2 px-6 text-white rounded border border-white flex gap-2 items-center justify-center">
        <span class=" justify-center text-center items-center" v-if="gmail">
            <IconGmailLogo />
        </span> {{ text }}
    </button>
</template>

<script setup>
import IconGmailLogo from '../icons/IconGmailLogo.vue';

defineProps({
    text: {
        type: String,
        required: true
    },
    gmail: {
        type: Boolean,
        default: false
    }
})
</script>