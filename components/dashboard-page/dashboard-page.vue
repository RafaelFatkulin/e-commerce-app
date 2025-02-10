<script lang="ts" setup>
import MobileSlideover from "~/components/mobile-slideover/mobile-slideover.vue";
</script>

<template>
  <header v-if="$slots.header" class="min-h-16 px-4 py-2 flex flex-row gap-2 border-b border-[var(--ui-border)]">
    <MobileSlideover/>
    <div
        class="flex-1 flex flex-row gap-x-4 gap-y-2 flex-wrap items-center justify-between">
      <slot name="header"/>
    </div>
  </header>

  <div v-if="$slots.subheader"
       class="px-4 py-2 min-h-12 flex flex-row items-center justify-between border-b border-[var(--ui-border)]"
  >
    <slot name="subheader"/>
  </div>

  <div class="flex-1 overflow-auto">
    <slot/>
  </div>
</template>