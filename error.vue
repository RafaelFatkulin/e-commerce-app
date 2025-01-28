<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout name="default">
    <UContainer class="py-12 max-h-full h-full">
        <div class="flex-1 flex flex-col gap-5 items-center justify-center">
        <h2 class="text-black">{{ error?.message }}</h2>
        <UButton 
            @click="handleError" 
            variant="outline" 
            color="neutral"
        >
            Go home
        </UButton>
    </div>
    </UContainer>
  </NuxtLayout>
</template>