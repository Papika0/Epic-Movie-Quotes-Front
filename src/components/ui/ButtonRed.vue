<template>
    <button
        :class="[customClass, 'bg-red-button text-white rounded hover:bg-button-hover active:bg-button-active border border-red-button', add ? 'flex flex-row gap-2' : '']"
        :type="type">
        <span class="my-auto justify-center text-center items-center" v-if="add">
            <IconAddButton class="w-5 h-5" />
        </span>
        {{ text }}
    </button>
</template>


<script setup>
import IconAddButton from '@/components/icons/movie/IconAddButton.vue';

defineProps({
    text: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'button'
    },
    add: {
        type: Boolean,
        default: false
    },
    customClass: {
        type: String,
        default: 'py-2 px-6'
    }
})
</script>