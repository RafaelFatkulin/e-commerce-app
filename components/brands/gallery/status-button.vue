<script lang="ts" setup>
import type { Media } from '~/types/media'

const { media } = defineProps<{
  media: Media
}>()

const emits = defineEmits<{
  (e: 'setMediaToUpdateStatus', media: Media): void
}>()
</script>

<template>
  <UTooltip
    text="Изменить статус"
    ignore-non-keyboard-focus
  >
    <UButton
      icon="i-lucide-eye"
      variant="ghost"
      color="primary"
      class="hidden sm:flex"
      @click="emits('setMediaToUpdateStatus', media)"
    />
  </UTooltip>
</template>
