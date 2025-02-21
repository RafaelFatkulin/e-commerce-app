<script lang="ts" setup>
import { useDeleteCategory } from '~/composables/categories/delete-category'

const { isOpen, categoryToDelete, setCategoryToDelete, execute, status } = useDeleteCategory()

const title = computed(
  () => categoryToDelete.value?.parentId
    ? 'Удаление подкатегории'
    : 'Удаление категории'
)
const description = computed(
  () => categoryToDelete.value?.parentId
    ? `Вы действительно хотите удалить подкатегорию "${categoryToDelete.value?.title}"?`
    : `Вы действительно хотите удалить категорию "${categoryToDelete.value?.title}"?`
)

async function onClick() {
  await execute()
}
async function closeModal() {
  setCategoryToDelete()
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    @update:open="closeModal()"
    :title
    :description
  >
    <template #body>
      <div class="flex flex-row items-center justify-end gap-4">
        <UButton
          icon="i-lucide-trash-2"
          color="error"
          :loading="status === 'pending'"
          @click="onClick"
        >
          Удалить
        </UButton>

        <UButton
          icon="i-lucide-ban"
          color="info"
          @click="closeModal"
        >
          Отмена
        </UButton>
      </div>
    </template>
  </UModal>
</template>
