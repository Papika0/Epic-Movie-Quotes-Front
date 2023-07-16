<template>
  <div class="relative inline-block my-auto px-2">
    <div class="flex items-center cursor-pointer" @click="toggleDropdown">
      <span class="text-white">{{ selectedOption }}</span>
      <IconDropdownArrow class="ml-2" :class="{ 'rotate-180': isDropdownOpen }" />
    </div>
    <ul
      v-show="isDropdownOpen"
      class="absolute top-full left-0 w-full bg-white py-2 mt-2 rounded shadow-md"
    >
      <li
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option)"
        class="cursor-pointer hover:bg-gray-100 py-2 px-4"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { setLocale } from '@vee-validate/i18n'
import IconDropdownArrow from '@/components/icons/header/IconDropdownArrow.vue'
import { onClickOutside } from '@vueuse/core'
import api from '@/plugins/axios/index.js'

const { locale, t } = useI18n()
const isDropdownOpen = ref(false)
const selectedOption = ref(t('texts.eng'))
let options = [
  { value: 'en', label: t('texts.eng') },
  { value: 'ge', label: t('texts.ka') }
]

onClickOutside(isDropdownOpen, () => (isDropdownOpen.value = false))

watch(
  () => locale.value,
  (newLocale) => {
    const engLabel = t('texts.eng')
    const kaLabel = t('texts.ka')
    selectedOption.value = newLocale === 'en' ? engLabel : kaLabel
    options = [
      { value: 'en', label: engLabel },
      { value: 'ge', label: kaLabel }
    ]
  }
)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectOption = (option) => {
  locale.value = option.value
  selectedOption.value = option.label
  localStorage.setItem('selectedLocale', option.value)
  isDropdownOpen.value = false
  const localeEndpoint = option.value === 'ge' ? '/set-locale/ka' : `/set-locale/${option.value}`
  api.get(localeEndpoint).then(() => {
    window.location.reload()
  })
}

onMounted(() => {
  const storedLocale = localStorage.getItem('selectedLocale')
  if (storedLocale && options.some((option) => option.value === storedLocale)) {
    const selectedLocale = options.find((option) => option.value === storedLocale)
    locale.value = selectedLocale.value
    selectedOption.value = selectedLocale.label
    if (selectedLocale.value === 'ge') {
      api.get('/set-locale/ka')
      setLocale('ka')
    } else {
      api.get('/set-locale/' + selectedLocale.value)
      setLocale('en')
    }
    isDropdownOpen.value = false
  }
})
</script>
