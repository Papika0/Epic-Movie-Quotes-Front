<template>
    <LayoutFeed>
        <QuoteAddNewsFeedModal v-if="useModalStore().showQuoteAddModal" />
        <div class="flex flex-col gap-12 w-[938px] mx-auto mb-48">
            <!-- TOO do search functionality -->
            <div class="flex flex-row gap-6 -mb-6 w-full">
                <div class="h-[52px] pl-4 inline-flex gap-4 bg-zinc-800 rounded-lg w-5/6 cursor-pointer"
                    @click="useModalStore().toggleQuoteAddModal">
                    <IconPencilSquare class="my-auto" />
                    <p class="text-white text-[20px] font-normal my-auto leading-loose">Write new quote</p>
                </div>
                <div class="my-auto">
                    <div v-if="showSearch" class="flex items-center gap-4 ">
                        <input v-model="searchQuery" type="text" placeholder="Search movie..."
                            class="px-2 my-auto rounded-md bg-transparent outline-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div v-show="!showSearch" class="flex flex-row gap-4" @click="showSearch = true">
                        <IconSearch class="my-auto " />
                        <p class="text-gray-300 text-[20px] font-normal leading-loose my-auto">
                            Search By
                        </p>
                    </div>
                </div>

            </div>
            <div v-if="isLoading" class="text-center text-white mt-4">Loading...</div>
            <div v-for="quote in quotes" :key="quote.id" class="bg-neutral-900 rounded-xl flex flex-col gap-6 px-6">
                <div class="inline-flex gap-4 mt-6">
                    <img class="w-[52px] h-[52px] rounded-full" :src="profileImage(quote.user.thumbnail)">
                    <p class="text-white text-[20px] font-normal leading-loose my-auto"> {{ quote.user.username }}</p>
                </div>

                <p class="text-white text-[20px] font-normal leading-loose">{{ quote.content }} <span
                        class="text-orange-200 text-[20px] font-medium leading-loose ml-2"> {{ quote.movie_name }}.</span>
                    ({{
                        quote.movie_release_date
                    }})</p>

                <img :src="quoteImage(quote.thumbnail)" class="w-full h-[500px] object-cover">

                <div class="inline-flex gap-8 mt-4 mb-2">
                    <div class="inline-flex gap-4">
                        <p class="text-white text-[20px] font-normal leading-loose">{{ quote.comments_count }}</p>
                        <IconComment class="my-auto" />
                    </div>
                    <IconLike class="my-auto" :likesCount="quote.likes_count" :liked="quote.liked_by_user"
                        :quoteId="quote.id" />
                </div>

                <hr class="border border-gray-500 w-full">

                <CommentCard :comments="quote.comments" />

                <div class="inline-flex gap-6 mb-8">
                    <img :src="authUserThumbnail" class="rounded-full w-[52px] h-[52px]" />
                    <input type="text" placeholder="Write a comment" v-model="commentText"
                        class="pl-7 py-3 h-[52px] w-full bg-zinc-800 text-white outline-none rounded-lg placeholder:text-gray-300 text-[20px] font-normal leading-loose"
                        @keyup.enter="createComment(quote)">
                </div>
            </div>
        </div>
    </LayoutFeed>
</template>
  
<script setup>
import LayoutFeed from '@/components/layouts/LayoutFeed.vue';
import { ref, onBeforeMount, onMounted, computed } from 'vue';
import { getQuotes } from '@/services/quotes';
import IconComment from '@/components/icons/IconComment.vue';
import IconPencilSquare from '@/components/icons/feed/IconPencilSquare.vue';
import IconSearch from '@/components/icons/movie/IconSearch.vue';
import IconLike from '@/components/icons/IconLike.vue';
import CommentCard from '@/components/shared/CommentCard.vue';
import QuoteAddNewsFeedModal from '@/components/modals/quote/QuoteAddNewsFeedModal.vue';
import { addComment } from '@/services/quotes.js';
import { useUserStore } from '@/stores/useUserStore';
import { useModalStore } from '@/stores/useModalStore';

const showSearch = ref(false);
const quotes = ref([]);
const commentText = ref('');
const isFetchingQuotes = ref(false);
const isLoading = ref(false);

let currentPage = 1;

const profileImage = ((thumbnail) => {
    return import.meta.env.VITE_API_AUTH_URL + thumbnail;
});


const createComment = async (quote) => {
    const comment = commentText.value;
    await addComment(quote.id, comment).then((res) => {
        quote.comments.push(res);
        commentText.value = '';
        quote.comments_count = res.comments_count;
    })
};


const authUserThumbnail = computed(() => {
    const thumbnail = useUserStore().user?.thumbnail;
    if (thumbnail) {
        return import.meta.env.VITE_API_AUTH_URL + thumbnail;
    }
    return null;
});

const quoteImage = ((image) => {
    return import.meta.env.VITE_API_AUTH_URL + image;
});

onBeforeMount(async () => {
    await fetchQuotes();
});

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

const handleScroll = async () => {
    if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight &&
        !isFetchingQuotes.value
    ) {
        isFetchingQuotes.value = true;
        await fetchQuotes();
        isFetchingQuotes.value = false;
    }
};

const fetchQuotes = async () => {
    const response = await getQuotes(currentPage);
    if (response.length === 0) {
        window.removeEventListener('scroll', handleScroll);
    }
    else {
        quotes.value = [...quotes.value, ...response];
        currentPage++;
    }
};

</script>
  