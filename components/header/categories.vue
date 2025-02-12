<script lang="ts" setup>
// const { activeCategory, hideMenuInstantly, clearHideTimer } = useHeaderCategoriesMenu()

const { activeCategory } = defineProps<{
  activeCategory: any
}>()

const emit = defineEmits<{
  clearHideTimer: []
  hideMenuInstantly: []
}>()
</script>

<template>
  <div v-if="activeCategory && activeCategory.children?.length">
    <Transition
    enter-active-class="transform transition ease-out duration-300"
      enter-from-class="opacity-0 scale-y-0 translate-y-2"
      enter-to-class="opacity-100 scale-y-100 translate-y-0"
      leave-active-class="transform transition ease-in duration-200"
      leave-from-class="opacity-100 scale-y-100 translate-y-0"
      leave-to-class="opacity-0 scale-y-0 translate-y-2"
    >
      <!-- ADD CAROUSEL HERE -->
      <div
        class="py-4 shadow-md absolute top-full left-0 right-0 bg-[var(--ui-bg)]"
        @mouseenter="emit('clearHideTimer')"
        @mouseleave="emit('hideMenuInstantly')"
      >
        <UContainer class="flex flex-col gap-4">
          <h3 class="text-2xl font-semibold">
            {{ activeCategory.label }}
          </h3>
          <ul class="grid grid-cols-2 grid-flow-col md:grid-cols-4 grid-rows-6 gap-4">
            <li
              v-for="subcategory in activeCategory.children"
              :key="subcategory.label"
            >
              <ULink
                :to="subcategory.to"
                class="text-gray-600 text-sm hover:text-[var(--ui-primary)]/75 transition duration-150 ease-in-out"
                @click="emit('hideMenuInstantly')"
              >
                {{ subcategory.label }}
              </ULink>
            </li>
          </ul>
        </UContainer>
      </div>
    </Transition>
  </div>
</template>
