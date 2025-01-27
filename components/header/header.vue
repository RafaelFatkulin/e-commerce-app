<script setup lang="ts">
import { UNavigationMenu } from '#components'

const { isLoggedIn } = useAuth()
const items = ref([
  {
    label: 'Manswear',
    to: '/products/man',
  },
  {
    label: 'Womanswear',
    to: '/products/woman',
  },
  {
    label: 'Kidswear',
    to: '/products/woman',
  },
])

const { y } = useWindowScroll()

const isScrolled = computed(() => y.value > 50)
</script>

<template>
  <header class="py-6 sticky top-0 bg-[var(--ui-bg)]" :class="isScrolled && 'border-b border-[var(--ui-border-muted)]'">
    <UContainer class="grid grid-cols-3">
      <UNavigationMenu :items class="justify-between w-full items-center" variant="pill" />

      <NuxtLink to="/" class="transition-colors hover:text-primary h-fit m-auto">
        <span class="text-3xl font-bold uppercase">SANE</span>
      </NuxtLink>

      <div class="flex flex-row gap-2 items-center justify-end">
        <AuthModal v-if="!isLoggedIn" />

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
    </UContainer>
  </header>
</template>
