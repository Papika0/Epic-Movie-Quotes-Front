<template>
    <div class="inline-flex gap-4">
        <p class="text-white text-[20px] font-normal leading-loose">{{ likesCount }}</p>
        <svg v-if="isActive" @click="handleClick" width="32" height="32" viewBox="0 0 32 32" fill="none"
            class="cursor-pointer my-auto" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_45_281)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M15.9996 2.6281C24.8756 -6.4959 47.0676 9.4701 15.9996 30.0001C-15.0684 9.4721 7.12357 -6.4959 15.9996 2.6281Z"
                    fill="#F3426C" />
            </g>
            <defs>
                <clipPath id="clip0_45_281">
                    <rect width="32" height="32" fill="white" />
                </clipPath>
            </defs>
        </svg>
        <svg v-else-if="isHovered" @click="handleClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
            class="cursor-pointer my-auto" width="32" height="30" viewBox="0 0 32 30" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15.9998 5.4961L14.5658 4.0221C11.1998 0.562097 5.02779 1.7561 2.79979 6.1061C1.75379 8.1521 1.51779 11.1061 3.42779 14.8761C5.26779 18.5061 9.09579 22.8541 15.9998 27.5901C22.9038 22.8541 26.7298 18.5061 28.5718 14.8761C30.4818 11.1041 30.2478 8.1521 29.1998 6.1061C26.9718 1.7561 20.7998 0.560097 17.4338 4.0201L15.9998 5.4961ZM15.9998 30.0001C-14.6662 9.7361 6.55779 -6.0799 15.6478 2.2861C15.7678 2.3961 15.8858 2.5101 15.9998 2.6281C16.1126 2.5102 16.2301 2.39678 16.3518 2.2881C25.4398 -6.0839 46.6658 9.7341 15.9998 30.0001Z"
                fill="#F3426C" />
        </svg>
        <svg v-else @click="handleClick" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" width="32"
            height="32" viewBox="0 0 32 32" fill="none" class="cursor-pointer my-auto" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_337_25880)">
                <path
                    d="M15.9999 5.4961L14.5659 4.0221C11.1999 0.562097 5.02791 1.7561 2.79991 6.1061C1.75391 8.1521 1.51791 11.1061 3.42791 14.8761C5.26791 18.5061 9.09591 22.8541 15.9999 27.5901C22.9039 22.8541 26.7299 18.5061 28.5719 14.8761C30.4819 11.1041 30.2479 8.1521 29.1999 6.1061C26.9719 1.7561 20.7999 0.560097 17.4339 4.0201L15.9999 5.4961ZM15.9999 30.0001C-14.6661 9.7361 6.55791 -6.0799 15.6479 2.2861C15.7679 2.3961 15.8859 2.5101 15.9999 2.6281C16.1128 2.5102 16.2302 2.39678 16.3519 2.2881C25.4399 -6.0839 46.6659 9.7341 15.9999 30.0001Z"
                    fill="white" />
            </g>
            <defs>
                <clipPath id="clip0_337_25880">
                    <rect width="32" height="32" fill="white" />
                </clipPath>
            </defs>
        </svg>
    </div>
</template>

<script setup>
import { ref, defineProps, onBeforeMount } from 'vue';
import { likeQuote, dislikeQuote } from '@/services/quotes.js';

const props = defineProps({
    likesCount: {
        type: Number,
        required: true,
    },
    liked: {
        type: Boolean,
        required: false,
        default: false,
    },
    quoteId: {
        type: Number,
        required: true,
    },
});

const likesCount = ref(null);

const isActive = ref(false);
const isHovered = ref(false);

const handleMouseEnter = () => {
    isHovered.value = true;
};

const handleMouseLeave = () => {
    isHovered.value = false;
};

const handleClick = async () => {
    isActive.value = !isActive.value;
    if (isActive.value) {
        await likeQuote(props.quoteId).then((res) => {
            likesCount.value = res.likes_count;
        });
    } else {
        await dislikeQuote(props.quoteId).then((res) => {
            likesCount.value = res.likes_count;
        });
    }
};

onBeforeMount(() => {
    isActive.value = props.liked;
    likesCount.value = props.likesCount;
});

</script>
  