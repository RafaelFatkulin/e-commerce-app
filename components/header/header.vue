<script setup lang="ts">
import { useHeaderCategoriesMenu } from '~/composables/header/header-categories-menu'

const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 50)
const {
  categories,
  isActive,
  toggleCategory,
  startHideTimer,
  activeCategory,
  clearHideTimer,
  hideMenuInstantly,
} = useHeaderCategoriesMenu()
</script>

<template>
  <header
    class="py-6 sticky top-0 bg-[var(--ui-bg)] flex flex-col gap-2"
    :class="isScrolled && 'border-b border-[var(--ui-border-muted)]'"
  >
    <UContainer class="w-full grid grid-cols-3">
      <HeaderLogo />

      <nav class="flex flex-row items-center gap-3">
        <UButton
          v-for="category in categories"
          :key="category.id"
          :to="category.to"
          variant="link"
          color="primary"
          :trailing-icon="category.children?.length ? 'i-lucide-chevron-down' : undefined"
          class="text-[var(--ui-text-muted)]"
          :ui="{
            base: isActive(category.id) ? 'text-[var(--ui-primary)] duration-250' : '',
            trailingIcon: `transition-transform duration-250 ${isActive(category.id) ? 'rotate-180' : 'rotate-0'}`,
          }"
          @mouseenter="toggleCategory(category.id)"
          @mouseleave="startHideTimer()"
          @click="hideMenuInstantly()"
        >
          {{ category.label }}
        </UButton>
      </nav>

      <HeaderButtons />
    </UContainer>
    <HeaderCategories
      :active-category="activeCategory"
      @clear-hide-timer="clearHideTimer"
      @hide-menu-instantly="hideMenuInstantly"
    />
  </header>
</template>
