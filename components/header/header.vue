<script setup lang="ts">
import type { NavigationMenuChildItem, NavigationMenuItem } from "@nuxt/ui";
import type { Category, RootCategory } from "~/types/categories";
import UserDropdown from "./user-dropdown.vue";
import { useCategoryTree } from "~/composables/categories/category-tree";

const { isLoggedIn } = useAuth();

const { data } = useCategoryTree();

function generateMenuItems(categories: Category[]): NavigationMenuItem[] {
  return categories.map(
    (item): NavigationMenuItem => ({
      label: item.shortTitle,
      to: `/products/${item.slug}`,
      children:
        item.categories.length > 0
          ? generateMenuSubitems(item.categories)
          : undefined,
    })
  );
}

function generateMenuSubitems(
  categories: Category[]
): NavigationMenuChildItem[] {
  return categories.map((item) => ({
    label: item.shortTitle,
    to: `/products/${item.slug}`,
  }));
}

const { y } = useWindowScroll();

const isScrolled = computed(() => y.value > 50);
</script>

<template>
  <header
    class="py-6 sticky top-0 bg-[var(--ui-bg)]"
    :class="isScrolled && 'border-b border-[var(--ui-border-muted)]'"
  >
    <UContainer class="grid grid-cols-3">
      <UNavigationMenu
        :unmount-on-hide="false"
        :items="data ? generateMenuItems(data?.data) : []"
        class="justify-between w-full items-center"
        variant="pill"
        color="primary"
        :ui="{
          root: 'static',
          viewport: 'rounded-none ring-0  bg-[var(--ui-bg)] border-t-0',
          viewportWrapper: 'fixed top-[72px] max-w-screen left-0 right-0',
          childList: 'flex flex-col w-full',
          childLinkLabel: 'font-normal cursor-pointer',
        }"
      >
        <template #item-content="{ item }">
          <div
            class="max-w-[var(--ui-container)] p-4 sm:p-6 lg:p-8 mx-auto flex flex-col gap-6"
          >
            <span class="text-lg sm:text-xl md:text-2xl font-semibold">{{
              item.label
            }}</span>
            <ul
              class="grid grid-cols-4 gap-x-8 gap-y-4 grid-rows-6 grid-flow-col"
            >
              <li v-for="subitem of item.children">
                <NuxtLink
                  :to="subitem.to"
                  class="transition-colors hover:text-[var(--ui-primary)]"
                  >{{ subitem.label }}</NuxtLink
                >
              </li>
            </ul>
          </div>
        </template>
      </UNavigationMenu>

      <NuxtLink
        to="/"
        class="transition-colors hover:text-primary h-fit m-auto"
      >
        <span class="text-3xl font-bold uppercase">SANE</span>
      </NuxtLink>

      <div class="flex flex-row gap-2 items-center justify-end">
        <AuthModal v-if="!isLoggedIn" />
        <UserDropdown v-else />

        <UButton
          variant="ghost"
          color="neutral"
        >
          <template #leading>
            <UIcon
              class="size-5 md:size-6"
              name="i-lucide-heart"
            />
          </template>
        </UButton>

        <UButton
          variant="ghost"
          color="neutral"
        >
          <template #leading>
            <UIcon
              class="size-5 md:size-6"
              name="i-lucide-shopping-bag"
            />
          </template>
        </UButton>

        <UButton
          variant="ghost"
          color="neutral"
        >
          <template #leading>
            <UIcon
              class="size-5 md:size-6"
              name="i-lucide-earth"
            />
          </template>
        </UButton>

        <ThemeButton />
      </div>
    </UContainer>
  </header>
</template>
