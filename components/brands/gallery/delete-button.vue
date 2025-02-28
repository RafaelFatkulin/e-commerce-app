<script lang="ts" setup>
import type { Media } from '~/types/media';

const { media } = defineProps<{
  media: Media
}>()

const emits = defineEmits<{
  (e: 'setMediaToDelete', media: Media): void
}>()
</script>

<template>
  <UTooltip
    text="Удалить изображение"
    ignore-non-keyboard-focus
  >
    <UButton
      @click="emits('setMediaToDelete', media)"
      icon="i-lucide-x"
      variant="ghost"
      color="error"
      class="hidden sm:flex"
    />
  </UTooltip>
</template>