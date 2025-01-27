<script setup lang="ts">
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<template>
  <ClientOnly v-if="!colorMode.forced">
    <UButton
      color="neutral"
      variant="ghost"
      @click="isDark = !isDark"
    >
      <template #leading>
        <UIcon class="size-5 md:size-6" :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'" />
      </template>
    </UButton>

    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>
