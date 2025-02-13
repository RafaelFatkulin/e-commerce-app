<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui';
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  activeCategory: any
}>()

const emit = defineEmits<{
  clearHideTimer: []
  hideMenuInstantly: []
}>()

const direction = ref('right')
const key = ref(0)

const currentCategory = computed<NavigationMenuItem>(() => props.activeCategory)

watch(() => props.activeCategory, (newCategory, oldCategory) => {
  if (newCategory && oldCategory) {
    direction.value = newCategory.id > oldCategory.id ? 'right' : 'left'
  } else {
    direction.value = 'right'
  }
  key.value++
})

const slideClasses = computed(() => {
  const baseClasses = 'transition-all duration-150 ease-in'
  if (direction.value === 'right') {
    return `${baseClasses} opacity-0 -translate-x-2`
  } else {
    return `${baseClasses} opacity-0 translate-x-2`
  }
})
</script>

<template>
  <div>
    <Transition
      enter-active-class="transition ease-out duration-250"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="currentCategory && currentCategory.children?.length"
        class="py-4 shadow-md absolute top-full left-0 right-0 bg-[var(--ui-bg)] overflow-hidden"
        @mouseenter="emit('clearHideTimer')"
        @mouseleave="emit('hideMenuInstantly')"
      >
        <UContainer>
          <Transition
            :enter-active-class="slideClasses"
            :leave-active-class="slideClasses"
            mode="out-in"
          >
            <div
              :key="key"
              class="flex flex-col gap-4"
            >

              <div
                v-if="currentCategory"
                class="flex flex-row items-center justify-between gap-4"
              >
                <h3 class="text-2xl font-semibold">
                  {{ currentCategory.label }}
                </h3>
                <UButton
                  variant="link"
                  :to="currentCategory.to"
                  @click="emit('hideMenuInstantly')"
                >Смотреть все</UButton>
              </div>
              <ul
                v-if="currentCategory && currentCategory.children"
                class="grid grid-cols-2 grid-flow-col md:grid-cols-4 grid-rows-6 gap-4"
              >
                <li
                  v-for="subcategory in currentCategory.children"
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
            </div>
          </Transition>
        </UContainer>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.2s ease-out;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
