<script lang="ts" setup>
import { useGetBrand } from '~/composables/brands/get-brand';

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const backLink = '/dashboard/brands'

const { data, error } = await useGetBrand(Number(route.params.id))
// Sort items by order initially and make reactive
const galleryItems = ref(
  (data.value?.data.media.filter(item => item.type === 'image') || [])
    .sort((a, b) => a.order - b.order)
)

// Drag and drop state
const draggedItem = ref<number | null>(null)
const dragOverItem = ref<number | null>(null)

useHead(() => ({
  title: `${data.value?.data.title} - Бренды`
}))

const onDragStart = (index: number) => {
  draggedItem.value = index
}

const onDragOver = (index: number) => {
  dragOverItem.value = index
}

const onDrop = (dropIndex: number) => {
  if (draggedItem.value === null || !galleryItems.value) return

  const newItems = [...galleryItems.value]
  const [dragged] = newItems.splice(draggedItem.value, 1)
  newItems.splice(dropIndex, 0, dragged)

  // Update order properties starting from 1
  newItems.forEach((item, index) => {
    item.order = index + 1  // Start from 1 instead of 0
  })

  galleryItems.value = newItems
  draggedItem.value = null
  dragOverItem.value = null

  console.log(newItems);


  // Here you might want to add an API call to save the new order
  // await updateGalleryOrder(newItems)
}

const onDragEnd = () => {
  draggedItem.value = null
  dragOverItem.value = null
}
</script>

<template>
  <DashboardPage>
    <template #header>
      <div class="flex flex-col">
        <DashboardTitle :back-to="backLink">
          {{ data?.data.title }}
        </DashboardTitle>
      </div>
    </template>

    <div class="p-4 grid gap-8 grid-cols-1 lg:grid-cols-2 items-start">
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

        <div class="grid grid-cols-4 gap-2">
          <div
            v-for="(item, index) in galleryItems"
            :key="item.path"
            class="w-full h-full aspect-square flex items-center justify-center border border-[var(--ui-border)] rounded-[calc(var(--ui-radius))] p-2 transition-all duration-200"
            :class="{
              'opacity-50': draggedItem === index,
              'border-dashed': dragOverItem === index && draggedItem !== index
            }"
            draggable
            @dragstart="onDragStart(index)"
            @dragover.prevent="onDragOver(index)"
            @drop.prevent="onDrop(index)"
            @dragend="onDragEnd"
            @dragenter.prevent
            @dragleave.prevent
          >
            <NuxtImg
              :src="item.path"
              :alt="item.alt"
              class="object-contain m-auto select-none"
            />
          </div>
        </div>
      </UCard>
      <BrandsEditForm
        v-if="data?.data"
        :brand="data?.data"
      />
    </div>
  </DashboardPage>
</template>