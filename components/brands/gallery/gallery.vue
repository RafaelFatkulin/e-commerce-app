<!-- components/MediaGallery.vue -->
<script lang="ts" setup>
import { BrandsGalleryItemButtons } from '#components';
import type { DropdownMenuItem } from '@nuxt/ui';
import { ref, computed } from 'vue';
import { useGetBrand } from '~/composables/brands/get-brand';
import { useMediaOrderChange } from '~/composables/media/media-order-change';
import { useMediaStatus } from '~/composables/media/media-status';
import type { Media } from '~/types/media';

const route = useRoute()
const toast = useToast();
const { data, error, status, updateMediaOrder } = useMediaOrderChange();
const { data: brandData, refresh } = await useGetBrand()

const galleryItems = computed(() =>
  [...brandData.value?.data.media!]
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

watch(status, (newStatus) => {
  if (newStatus === 'success') {
    toast.add({
      title: 'Успешно',
      description: data.value?.message as string,
      icon: 'i-lucide-circle-check',
      color: 'success'
    });
    refresh()
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

const tempMedia = ref<Media>()
const items = ref<DropdownMenuItem[]>([
  {
    label: 'Изменить статус',
    icon: 'i-lucide-eye',
    slot: 'status'
  },
  {
    label: 'Удалить',
    icon: 'i-lucide-trash-2',
  },
])
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

    <div
      class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-4 2xl:grid-cols-5 gap-2"
    >
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
        <BrandsGalleryItemButtons>

          <BrandsGalleryStatusModal
            :media="item"
            dismissible
          />
          <BrandsGalleryDeleteModal :media="item" />
        </BrandsGalleryItemButtons>

        <UDropdownMenu :items>
          <UButton
            icon="i-lucide-ellipsis-vertical"
            color="neutral"
            variant="ghost"
            @click="tempMedia = item"
          />

          <template #status>
            <BrandsGalleryStatusModal
              :media="tempMedia!"
              labelled
            />
          </template>
        </UDropdownMenu>
      </BrandsGalleryItem>

      <BrandsGalleryAddButton />
    </div>
  </UCard>
</template>