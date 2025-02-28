<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Media } from '~/types/media'

const { media } = defineProps<{
  media: Media
}>()

const emits = defineEmits<{
  (e: 'setMediaToUpdateStatus', media: Media): void
  (e: 'setMediaToDelete', media: Media): void
}>()
const items = ref<DropdownMenuItem[]>([
  {
    label: 'Изменить статус',
    icon: 'i-lucide-eye',
    color: 'primary',
    onSelect() {
      emits('setMediaToUpdateStatus', media)
    },
  },
  {
    label: 'Удалить',
    icon: 'i-lucide-trash-2',
    color: 'error',
    onSelect() {
      emits('setMediaToDelete', media)
    },
  },
])
</script>

<template>
  <UDropdownMenu :items>
    <UButton
      icon="i-lucide-ellipsis-vertical"
      color="neutral"
      variant="ghost"
      class="flex sm:hidden"
    />
  </UDropdownMenu>
</template>
