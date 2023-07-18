<template>
  <div class="flex flex-col mx-8 lg:mx-0">
    <label :for="name" class="text-white lg:mb-2">{{ label }} </label>
    <div class="flex flex-row gap-8 border-b border-gray-300 border-opacity-50 lg:border-none">
      <input
        :type="textType"
        :name="name"
        :value="value"
        :id="name"
        disabled="true"
        class="w-5/6 h-10 text-white lg:text-black lg:bg-input bg-transparent lg:border border-input lg:pl-3 placeholder:text-placeholder rounded-md outline-none focus:shadow-input"
      />
      <p class="text-white text-xl my-auto cursor-pointer" v-if="editable" @click="handleEditClick">
        Edit
      </p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  label: {
    type: String,
    required: false,
    default: ''
  },
  value: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  textType: {
    type: String,
    default: 'text'
  },
  editable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['edit'])

const handleEditClick = () => {
  emit('edit')
}
</script>
