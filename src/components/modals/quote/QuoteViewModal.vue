<template>
    <LayoutEditModal @close="closeModal" :title="$t('quotes.view_quote')">
        <template v-slot:header>
            <div class="flex flex-row lg:gap-4 gap-1 absolute mt-9">
                <IconEditPencil class="my-auto cursor-pointer lg:ml-10 ml-2" @click="editQuote" />
                <hr class="rotate-90 border border-gray-500 w-5 my-auto">
                <IconDelete class="my-auto cursor-pointer" @click="deleteQuote" />
            </div>
        </template>
        <template v-slot:body>
            <div class="flex flex-col gap-4">
                <InputMovie name="content_en" :placeholder="quote.content_en" :disabled="true" />
                <InputMovie name="content_ka" :placeholder="quote.content_ka" :disabled="true" lang="ქარ" />

                <img :src="quoteThumbnail" alt="thumbnail" class="w-[897px] lg:h-[513px] h-[302px] rounded-lg mt-2" />

                <div class="inline-flex gap-8 mt-4 mb-2">
                    <div class="inline-flex gap-4">
                        <p class="text-white text-[20px] font-normal leading-loose">{{ quote.comments?.length }}</p>
                        <IconComment class="my-auto" />
                    </div>

                    <div v-if="isLoaded">
                        <IconLike :likesCount="quote.likes_count" :liked="quote.liked_by_user" :quoteId="quote.id" />
                    </div>
                </div>

                <CommentCard :comments="quote.comments" v-if="isLoaded" />

                <div class="inline-flex gap-6 mb-8">
                    <img :src="profileImageUrl" class="rounded-full w-[52px] h-[52px]" />
                    <input type="text" :placeholder="$t('quotes.write_a_comment')" v-model="commentText" name="comment"
                        class="pl-7 py-3 h-[52px] w-full bg-zinc-800 text-white outline-none rounded-lg placeholder:text-gray-300 text-[20px] font-normal leading-loose"
                        @keyup.enter="createComment($event.target.value)">
                </div>
            </div>
        </template>
    </LayoutEditModal>
</template>


<script setup>
import LayoutEditModal from '@/components/layouts/LayoutEditModal.vue';
import IconEditPencil from '@/components/icons/IconEditPencil.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconComment from '@/components/icons/IconComment.vue';
import IconLike from '@/components/icons/IconLike.vue';
import CommentCard from '@/components/shared/CommentCard.vue';

import { computed, defineProps, ref, onBeforeMount, onMounted } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { getQuoteById, deleteQuoteById, addComment } from '@/services/quotes.js';

import router from '@/router/index.js';
import InputMovie from '@/components/ui/InputMovie.vue';


const quote = ref([]);
const commentText = ref('');
const isLoaded = ref(false);

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const closeModal = () => {
    router.push({ name: 'movie-details', params: { id: quote.value.movie_id } })
};

const deleteQuote = async () => {
    await deleteQuoteById(props.id).then(() => {
        router.push({ name: 'movie-details', params: { id: quote.value.movie_id } })
    })
};

const editQuote = () => {
    router.push({ name: 'quote-details', params: { id: props.id, type: 'edit' } })
};

const createComment = async () => {
    const comment = commentText.value;
    await addComment(props.id, comment).then((res) => {
        commentText.value = '';
        quote.value.comments_count = res.comments_count;
    })
};

onBeforeMount(async () => {
    try {
        const data = await getQuoteById(props.id);
        quote.value = data;
    } catch (error) {
        console.error('Failed to fetch quote:', error);
    } finally {
        isLoaded.value = true;
    }
});

const profileImageUrl = computed(() => {
    const thumbnail = useUserStore().user?.thumbnail;
    if (thumbnail) {
        return import.meta.env.VITE_API_AUTH_URL + thumbnail;
    }
    return null;
});

const quoteThumbnail = computed(() => import.meta.env.VITE_API_AUTH_URL + quote.value.thumbnail);


onMounted(() => {
    window.Echo.channel("likes").listen("QuoteLiked", (data) => {
        if (quote.value.id === data.message.quote_id) {
            quote.value.likes_count = data.message.likes_count;
        }
    });
    window.Echo.channel("comments").listen("CommentAdded", (data) => {
        console.log(data.message);
        if (quote.value.id === data.message.quote_id) {
            quote.value.comments.push(data.message);
        }
    });
});
</script>