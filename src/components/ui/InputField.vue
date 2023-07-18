<template>
  <div class="flex flex-col">
    <label :for="name" class="text-white mb-2"
      >{{ label }} <span class="text-red-star">*</span></label
    >
    <div class="relative">
      <Field :name="name" :rules="rules" v-slot="{ field, meta }">
        <input
          :type="inputType"
          :placeholder="placeholder"
          v-bind="field"
          :id="name"
          class="h-10 bg-input border border-input pl-3 placeholder:text-placeholder rounded-md w-full outline-none focus:shadow-input"
          :class="
            (meta.touched && !meta.valid) || apiError
              ? 'border-red-500'
              : meta.touched && meta.valid
              ? 'border-green-500'
              : ''
          "
        />
        <IconPasswordEye
          v-if="textType === 'password'"
          class="absolute right-3 top-2/4 transform -translate-y-2/4 cursor-pointer"
          :class="meta.touched && (meta.valid || !meta.valid) && 'right-9'"
          @click="togglePasswordVisibility"
        />
        <IconInputInvalid
          class="absolute right-3 top-2/4 transform -translate-y-2/4"
          v-if="(!meta.valid && meta.touched) || apiError"
        />
        <IconInputValid
          class="absolute right-3 top-2/4 transform -translate-y-2/4"
          v-if="meta.valid && meta.touched && !apiError"
        />
      </Field>
    </div>
    <ErrorMessage :name="name" class="text-red-star mt-1 text-sm" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import IconPasswordEye from '@/components/icons/input/IconPasswordEye.vue'
import IconInputInvalid from '@/components/icons/input/IconInputInvalid.vue'
import IconInputValid from '@/components/icons/input/IconInputValid.vue'
import { ref } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: false,
    default: ''
  },
  placeholder: {
    type: String,
    required: true,
    default: ''
  },
  name: {
    type: String,
    required: true,
    default: ''
  },
  textType: {
    type: String,
    default: 'text'
  },
  rules: {
    type: String,
    default: ''
  },
  apiError: {
    type: Boolean,
    default: false
  }
})

const inputType = ref(props.textType)

const togglePasswordVisibility = () => {
  inputType.value = inputType.value === 'password' ? 'text' : 'password'
}
</script>
