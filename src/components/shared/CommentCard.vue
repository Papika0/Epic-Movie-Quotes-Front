<template>
  <div class="max-h-433 overflow-y-auto">
    <div v-for="comment in comments" :key="comment.id" class="flex flex-col">
      <div class="inline-flex gap-6">
        <img
          :src="userThumbnail(comment)"
          alt="thumbnail"
          class="w-52px h-52px rounded-full my-auto"
          v-if="comment.user.thumbnail"
        />
        <div class="w-52px h-52px rounded-full bg-red-800 justify-center flex" v-else>
          <p class="text-white text-xl font-normal leading-loose flex my-auto">
            {{ comment.user.username[0].toUpperCase() }}
          </p>
        </div>
        <p class="text-white text-xl font-medium leading-loose my-auto">
          {{ comment.user.username }}
        </p>
      </div>
      <p class="text-white text-xl font-normal leading-loose w-full pl-75px mx-auto pb-6">
        {{ comment.content }}
      </p>
      <hr class="border-b border-zinc-100 border-opacity-30 ml-75px mb-8" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  comments: {
    type: Object,
    required: true
  }
})

const userThumbnail = (comment) => import.meta.env.VITE_API_AUTH_URL + comment.user.thumbnail
</script>
