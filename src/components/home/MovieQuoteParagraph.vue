<template>
    <div class="flex flex-col gap-4 ml-60 pt-96">
        <div class="flex flex-row gap-4">
            <hr class="text-white w-14 border-2 border-white mt-9">
            <p class="font-bold text-white text-5xl leading-normal font-title">
                <slot></slot>
            </p>
        </div>
        <p class="text-white text-2xl font-bold ml-[72px] font-title">{{ movie }}</p>
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