<script lang="ts" setup>
import type { Media } from '~/types/media';

defineProps<{
  item: Media;
  index: number;
  isDragging: boolean;
  isDragOver: boolean;
}>();

defineEmits<{
  (e: 'dragstart', index: number): void;
  (e: 'dragover', index: number): void;
  (e: 'drop', index: number): void;
  (e: 'dragend'): void;
}>();

const runtimeConfig = useRuntimeConfig()

const getPath = (path: string) => {
  return `${runtimeConfig.public.apiUrl}${path}`
}
</script>

<template>
  <div
    class="w-full h-full relative group overflow-hidden aspect-square flex items-center justify-center border border-[var(--ui-border)] rounded-[calc(var(--ui-radius))] p-2 transition-all duration-200"
    :class="{
      'opacity-50': isDragging,
      'border-dashed': isDragOver && !isDragging
    }"
    draggable
    @dragstart="$emit('dragstart', index)"
    @dragover.prevent="$emit('dragover', index)"
    @drop.prevent="$emit('drop', index)"
    @dragend="$emit('dragend')"
    @dragenter.prevent
    @dragleave.prevent
  >
    <div
      class="absolute top-1 right-1 sm:opacity-0 transition-opacity duration-300 opacity-100 sm:group-hover:opacity-100 group-hover:pointer-events-auto"
    >
      <slot />
    </div>
    <NuxtImg
      :src="getPath(item.path)"
      :alt="item.alt"
      preload
      class="object-contain m-auto select-none w-full aspect-video"
      :class="{ 'opacity-25': item.status === 'not-active' }"
    />
  </div>
</template>