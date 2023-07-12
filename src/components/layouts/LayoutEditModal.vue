<template>
    <div class="fixed top-0 left-0 right-0 lg:mt-[120px] flex items-center z-50 justify-center" @click="handleOutsideClick">
        <div class="fixed inset-0 backdrop-filter backdrop-blur-sm z-50 bg-opacity-75 bg-outside-modal"></div>
        <div class="relative lg:max-h-[800px] max-h-screen overflow-y-scroll bg-neutral-900 lg:rounded-xl w-full z-50 max-w-[961px]"
            ref="modalContentRef">
            <div class="mb-6 h-[92px] border-b border-zinc-100 border-opacity-20 flex flex-row">
                <slot name="header"></slot>
                <p class="text-white text-2xl font-medium leading-9 text-center mx-auto my-auto">{{ title }}
                </p>
                <button class="mr-8" @click="emit('close')">
                    <IconCloseX class="w-8 h-8 relative " />
                </button>
            </div>
            <div class="px-8">
                <div class="flex flex-row gap-4 mb-7">
                    <img :src="profileImageUrl" class="rounded-full w-60 h-60" />
                    <p class="text-white text-xl my-auto leading-loose">{{ useUserStore().user?.username }}</p>
                </div>

                <slot name="body"></slot>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { defineEmits, ref, computed } from 'vue';
import IconCloseX from '@/components/icons/movie/IconCloseX.vue';
import { useUserStore } from '@/stores/useUserStore';

const profileImageUrl = computed(() => {
    const thumbnail = useUserStore().user?.thumbnail;
    if (thumbnail) {
        return import.meta.env.VITE_API_AUTH_URL + thumbnail;
    }
    return null;
});

defineProps({
    title: {
        type: String,
        required: true,
    },
})


const emit = defineEmits(['close']);
const modalContentRef = ref(null);


function handleOutsideClick(event) {
    if (modalContentRef.value && !modalContentRef.value.contains(event.target)) {
        emit('close');
    }
}

</script>
  