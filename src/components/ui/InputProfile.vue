<template>
    <div class="flex flex-col">
        <label :for="name" class="text-white mb-2">{{ label }} </label>
        <div class="flex flex-row gap-8">
            <input :type="textType" :name="name" :value="value" disabled="true"
                class="w-5/6 h-10 bg-input border border-input pl-3 placeholder:text-placeholder rounded-md  outline-none focus:shadow-input">
            <p class="text-white text-xl my-auto cursor-pointer" v-if="editable" @click="handleEditClick">Edit</p>
        </div>

    </div>
</template>


<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    label: {
        type: String,
        required: false,
    },
    value: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    textType: {
        type: String,
        default: 'text',
    },
    editable: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['edit']);

const handleEditClick = () => {
    emit('edit');
};

</script>
