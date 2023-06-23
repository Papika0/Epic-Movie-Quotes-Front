<template>
    <div class="relative inline-block my-auto px-2" ref="dropdown">
        <div class="flex items-center cursor-pointer" @click="toggleDropdown">
            <span class="text-white">{{ selectedOption }}</span>
            <IconDropdownArrow class="ml-2" :class="{ 'rotate-180': isDropdownOpen }" />
        </div>
        <ul v-show="isDropdownOpen" class="absolute top-full left-0 w-full bg-white py-2 mt-2 rounded shadow-md">
            <li v-for="option in options" :key="option.value" @click="selectOption(option)"
                class="cursor-pointer hover:bg-gray-100 py-2 px-4">
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import IconDropdownArrow from '@/components/icons/header/IconDropdownArrow.vue';

const { locale } = useI18n();
const isDropdownOpen = ref(false);
const selectedOption = ref('Eng');
const options = [
    { value: 'en', label: 'Eng' },
    { value: 'ge', label: 'Ka' }
];

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const selectOption = (option) => {
    selectedOption.value = option.label;
    locale.value = option.value;
    localStorage.setItem('selectedLocale', option.value);
    isDropdownOpen.value = false;
};

onMounted(() => {
    const storedLocale = localStorage.getItem('selectedLocale');
    if (storedLocale && options.some((option) => option.value === storedLocale)) {
        selectOption(options.find((option) => option.value === storedLocale));
    }
});
</script>
  