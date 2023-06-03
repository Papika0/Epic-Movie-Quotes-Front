<template>
    <button class="py-2 px-6 text-white rounded border border-white">
        {{ text }}
    </button>
</template>

<script setup>
defineProps({
    text: {
        type: String,
        required: true
    }
})
</script>