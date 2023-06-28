<template>
    <div class="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center" @click="handleOutsideClick">
        <div class="fixed inset-0 backdrop-filter backdrop-blur-sm z-50 bg-opacity-75 bg-outside-modal"></div>
        <div class="relative bg-gray-800 rounded-xl w-full px-120 z-50" :class="[small ? 'px-20 max-w-540' : 'max-w-xl']"
            ref="modalContentRef">
            <div class="flex flex-col gap-3 items-center justify-between mb-6 mt-14" :class="small && 'mb-8 mt-72'">
                <slot name="header"></slot>
            </div>
            <div class="flex flex-col gap-4">
                <slot name="body"></slot>
            </div>
            <div class="mt-8 mb-14 flex gap-1" :class="small && 'mt-10 mb-16'">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { defineEmits, defineProps, ref } from 'vue';

const emit = defineEmits(['close']);
const modalContentRef = ref(null);

defineProps({
    small: {
        type: Boolean,
        default: false,
    },
});

function handleOutsideClick(event) {
    if (modalContentRef.value && !modalContentRef.value.contains(event.target)) {
        emit('close');
    }
}

</script>
  