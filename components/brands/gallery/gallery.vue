<!-- components/MediaGallery.vue -->
<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useMediaOrderChange } from '~/composables/media/media-order-change';
import type { Media } from '~/types/media';

const { media } = defineProps<{
  media: Media[];
}>();

const emit = defineEmits<{
  (e: 'refresh'): Promise<void>;
  (e: 'add-files', files: File[]): void;
}>();

const { data, error, status, updateMediaOrder } = useMediaOrderChange();
const toast = useToast();

const galleryItems = computed(() =>
  [...media]
    .filter(item => item.type === 'image')
    .sort((a, b) => a.order - b.order)
);

const draggedItem = ref<number | null>(null);
const dragOverItem = ref<number | null>(null);

const onDragStart = (index: number) => {
  draggedItem.value = index;
};

const onDragOver = (index: number) => {
  dragOverItem.value = index;
};

const onDrop = (dropIndex: number) => {
  if (draggedItem.value === null) return;

  const newItems = [...galleryItems.value];
  const [dragged] = newItems.splice(draggedItem.value, 1);
  newItems.splice(dropIndex, 0, dragged);

  const updatedItems = newItems.map((item, index) => ({
    ...item,
    order: index + 1
  }));

  draggedItem.value = null;
  dragOverItem.value = null;

  updateMediaOrder(updatedItems.map(item => ({
    id: item.id,
    order: item.order
  })));
};

const onDragEnd = () => {
  draggedItem.value = null;
  dragOverItem.value = null;
};

const handleFilesSelected = (files: File[]) => {
  emit('add-files', files);
};

watch(status, (newStatus) => {
  if (newStatus === 'success') {
    toast.add({
      title: 'Успешно',
      description: data.value?.message as string,
      icon: 'i-lucide-circle-check',
      color: 'success'
    });
    emit('refresh');
  }

  if (newStatus === 'error') {
    toast.add({
      title: 'Ошибка',
      description: error.value?.data?.message as string,
      icon: 'i-lucide-circle-x',
      color: 'error'
    });
  }
});
</script>

<template>
  <UCard>
    <template #header>
      <h2
        class="text-base text-pretty font-semibold text-(--ui-text-highlighted)"
      >
        Галерея
      </h2>
      <p class="text-sm text-pretty text-(--ui-text-muted)">
        Редактирование галереи
      </p>
    </template>

    <div class="grid grid-cols-5 gap-2">
      <BrandsGalleryItem
        v-for="(item, index) in galleryItems"
        :key="item.path"
        :item="item"
        :index="index"
        :is-dragging="draggedItem === index"
        :is-drag-over="dragOverItem === index"
        @dragstart="onDragStart"
        @dragover="onDragOver"
        @drop="onDrop"
        @dragend="onDragEnd"
      >
        <BrandsGalleryStatusButton />
        <BrandsGalleryDeleteButton
          :media="item"
          @refresh="emit('refresh')"
        />
      </BrandsGalleryItem>

      <BrandsGalleryAddButton @files-selected="handleFilesSelected" />
    </div>
  </UCard>
</template>