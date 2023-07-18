<template>
  <div class="absolute bg-top-shadow w-screen min-h-screen"></div>
  <div class="absolute bg-left-shadow w-screen min-h-screen"></div>
  <div class="absolute flex flex-col gap-4 lg:ml-60 ml-5 lg:pt-96 pt-52">
    <div class="flex flex-row gap-4">
      <hr class="text-white lg:w-14 w-4 lg:border-2 border-white lg:mt-6 mt-4" />
      <p
        class="font-bold text-white lg:text-5xl text-xl leading-normal font-title max-w-xs lg:max-w-5xl"
      >
        <slot></slot>
      </p>
    </div>
    <p class="text-zinc-300 lg:text-2xl font-bold lg:ml-72px ml-8 font-title">{{ movie }}</p>
  </div>
</template>

<script setup>
defineProps({
  movie: {
    type: String,
    required: true
  }
})
</script>
