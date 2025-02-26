<script lang="ts" setup>
import { ref } from 'vue';

const fileInput = ref<HTMLInputElement | null>(null);

const emit = defineEmits<{
  (e: 'files-selected', files: File[]): void;
}>();

const handleClick = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.files && target.files.length > 0) {
    const filesArray = Array.from(target.files);
    emit('files-selected', filesArray);
    target.value = '';
  }
};
</script>

<template>
  <div
    class="w-full h-full relative group overflow-hidden aspect-square flex flex-col gap-1 items-center justify-center border border-[var(--ui-border)] rounded-[calc(var(--ui-radius))] p-2 transition-all duration-200 text-[var(--ui-text-muted)]/50 hover:text-[var(--ui-primary)] cursor-pointer"
    @click="handleClick"
  >
    <span>Добавить</span>
    <UIcon
      name="i-lucide-circle-plus"
      class="size-10"
    />
    <input
      ref="fileInput"
      type="file"
      multiple
      class="hidden"
      @change="handleFileChange"
    />
  </div>
</template>