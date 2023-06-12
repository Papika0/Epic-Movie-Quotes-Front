<template>
    <button
        class="bg-red-button py-2 px-6 text-white rounded hover:bg-button-hover active:bg-button-active border border-red-button"
        :type="type">
        {{ text }}
    </button>
</template>


<script setup>

defineProps({
    text: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'button'
    },
})
</script>