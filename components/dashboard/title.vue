<script setup lang="ts">
const {
  backTo,
} = defineProps<{ backTo?: string }>()
</script>

<template>
  <div
    class="flex flex-row gap-1 items-center flex-1"
    :class="{ 'items-start': $slots.subtitle }"
  >
    <UButton
      v-if="backTo"
      variant="ghost"
      color="neutral"
      icon="i-lucide-chevron-left"
      :to="backTo"
    />
    <div class="flex flex-row items-center gap-4 justify-between w-full">
      <div class="flex flex-col">
        <h1
          class="flex items-center gap-1.5 font-semibold text-gray-900 dark:text-white min-w-0"
        >
          <slot />
        </h1>
        <span
          v-if="$slots.subtitle"
          class="text-sm text-[var(--ui-text-muted)]"
        >
          <slot name="subtitle" />
        </span>
      </div>
      <slot name="button" />
    </div>
  </div>
</template>
