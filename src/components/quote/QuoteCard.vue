<template>
    <div v-for="quote in quotesRef" :key="quote.id"
        class="w-[809px] h-[268px] bg-quote-background rounded-lg z-10 backdrop-blur-[50px] py-6 px-8 flex flex-col gap-6">

        <IconThreeDots class="my-auto absolute right-0 mr-8 cursor-pointer" @click="toggleDropdown(quote.id)" />
        <div v-if="activeDropdown === quote.id"
            class="w-[248px] h-[200px] absolute bg-zinc-800 rounded-lg flex flex-col gap-8 p-8 mt-7 left-full -ml-14">

            <div class="items-center gap-4 inline-flex cursor-pointer">
                <IconEye class="w-5 h-5 relative" />
                <div class="text-white leading-normal" @click="viewQuote(quote.id)">View Quote</div>
            </div>

            <div class="items-center gap-4 inline-flex cursor-pointer">
                <IconEditPencil class="w-5 h-5 relative" />
                <div class="text-white leading-normal" @click="editQuote(quote.id)">Edit</div>
            </div>

            <div class="items-start gap-4 inline-flex cursor-pointer">
                <IconDelete class="w-5 h-5 relative" />
                <div class="text-white leading-normal" @click="deleteQuote(quote.id)">Delete</div>
            </div>
        </div>

        <div class="inline-flex gap-8 border-b border-zinc-100 border-opacity-20 pb-6">
            <img :src="getFullImageUrl(quote.thumbnail)" class="w-[226px] h-[140px] rounded-sm object-cover" />
            <p class="w-[477px] h-[73px] text-gray-300 text-[24px] font-normal leading-9 my-auto">{{ quote.content }}</p>
        </div>

        <div class="inline-flex gap-8 pl-[10px]">
            <div class="inline-flex gap-4">
                <p class="text-white text-[20px] font-normal leading-loose">{{ quote.comments_count }}</p>
                <IconComment class="my-auto" />
            </div>
            <div class="inline-flex gap-4">
                <p class="text-white text-[20px] font-normal leading-loose">{{ quote.likes_count }}</p>
                <IconLike class="my-auto" />
            </div>
        </div>

    </div>
</template>
  
<script setup>
import { defineProps, ref, onMounted } from 'vue';
import IconComment from '@/components/icons/IconComment.vue';
import IconLike from '@/components/icons/IconLike.vue';
import IconThreeDots from '@/components/icons/IconThreeDots.vue';
import IconEditPencil from '@/components/icons/IconEditPencil.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconEye from '@/components/icons/IconEye.vue';
import router from '@/router/index.js';
import { deleteQuoteById } from '@/services/quotes.js';

const props = defineProps({
    quotes: {
        type: Array,
        required: true,
    },
});

const quotesRef = ref([]);

onMounted(() => {
    quotesRef.value = props.quotes;
});

const activeDropdown = ref(null);

const viewQuote = (id) => {
    router.push({ name: 'quote-details', params: { id: id, type: 'view' } });
};

const editQuote = (id) => {
    router.push({ name: 'quote-details', params: { id: id, type: 'edit' } });
};

const deleteQuote = async (id) => {
    await deleteQuoteById(id).then(() => {
        quotesRef.value = quotesRef.value.filter((quote) => quote.id !== id);
    })
};

const getFullImageUrl = (thumbnail) => {
    return import.meta.env.VITE_API_AUTH_URL + thumbnail;
};

const toggleDropdown = (quoteId) => {
    activeDropdown.value = activeDropdown.value === quoteId ? null : quoteId;
};

</script>
  