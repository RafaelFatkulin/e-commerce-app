<script setup lang="ts">
const {
  back,
} = defineProps<{ back?: boolean }>()

const router = useRouter()

const handleButton = () => router.back()
</script>

<template>
  <div
    class="flex flex-row gap-1 items-center"
    :class="{ 'items-start': $slots.subtitle }"
  >
    <UButton
      v-if="back"
      variant="ghost"
      color="neutral"
      icon="i-lucide-chevron-left"
      @click="handleButton"
    />
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
  </div>
</template>
