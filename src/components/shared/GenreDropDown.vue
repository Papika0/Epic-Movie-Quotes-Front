<template>
    <div class="relative ">
        <div class="flex flex-col gap-1">
            <Field name="genres" type="hidden" :rules="rules" :value="selected" v-slot="{ meta }">
                <div class="min-h-[48px] px-4 overflow-x-auto py-2 bg-neutral-900 rounded border border-gray-500  items-center flex flex-wrap max-w-full gap-1"
                    @click="toggleDropdown"
                    :class="[meta.touched && !meta.valid ? 'border-red-500' : (meta.touched && meta.valid ? 'border-green-500' : '')]">
                    <p class="text-gray-500 font-normal leading-loose" v-if="showPlaceholder">Genres</p>
                    <div v-for="option in selected" :key="option.id"
                        class="p-0.5 rounded-sm justify-start items-start flex ">
                        <div class="rounded-sm items-center flex flex-row justify-between px-1 py-1 bg-gray-500">
                            <p class="text-white text-sm font-normal leading-snug">{{ options.find((opt) => opt.id ===
                                option)?.label
                            }}
                            </p>
                            <IconCloseX class="w-4 h-4 relative cursor-pointer" @click.stop="deleteOption(option)" />
                        </div>
                    </div>
                </div>
                <ErrorMessage name="genres" class="pl-2 pt-1 text-red-star text-sm" />
            </Field>
        </div>
        <ul v-if="isDropdownOpen"
            class="absolute mt-3 left-0 w-full bg-neutral-900 py-2 rounded border border-gray-500 shadow-md z-50 max-h-56 overflow-y-scroll">
            <li v-for="option in options" :key="option.id" @click.stop="selectOption(option)"
                class="cursor-pointer hover:bg-gray-500 py-2 px-4 text-white">
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>
  
<script setup>
import { Field, ErrorMessage } from 'vee-validate';
import IconCloseX from '@/components/icons/movie/IconCloseX.vue';
import { getGenres } from '@/services/movies.js';

import { ref, computed, defineProps, onBeforeMount } from 'vue';

const props = defineProps({
    rules: {
        type: String,
        default: "",
        required: true,
    },
    oldValue: {
        type: Array,
        default: () => [],
    }
})

const isDropdownOpen = ref(false);

const options = ref([]);

const selected = ref([]);


props.oldValue.forEach((genre) => {
    selected.value.push(genre.id);
});

const showPlaceholder = computed(() => {
    return selected.value.length === 0;
});


function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value;
}

const selectOption = (option) => {
    if (!selected.value.includes(option.label)) {
        selected.value.push(option.id);
    }
    isDropdownOpen.value = false;
};

const deleteOption = (option) => {
    const index = selected.value.findIndex((opt) => opt === option);
    if (index !== -1) {
        selected.value.splice(index, 1);
    }
};

onBeforeMount(async () => {
    await getGenres().then((res) => {
        res.data.forEach((genre) => {
            options.value.push({ id: genre.id, label: genre.name });
        });
    });
});

</script>
  