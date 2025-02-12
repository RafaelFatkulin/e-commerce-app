<script lang="ts" setup>
const { isLoggedIn } = useAuth()
</script>

<template>
  <div class="flex flex-row gap-2 items-center justify-end">
    <AuthModal v-if="!isLoggedIn" />
    <HeaderDropdown v-else />
    <UButton variant="ghost" color="neutral">
      <template #leading>
        <UIcon class="size-5 md:size-6" name="i-lucide-heart" />
      </template>
    </UButton>
    <UButton variant="ghost" color="neutral">
      <template #leading>
        <UIcon class="size-5 md:size-6" name="i-lucide-shopping-bag" />
      </template>
    </UButton>
    <UButton variant="ghost" color="neutral">
      <template #leading>
        <UIcon class="size-5 md:size-6" name="i-lucide-earth" />
      </template>
    </UButton>
    <ThemeButton />
  </div>
</template>
