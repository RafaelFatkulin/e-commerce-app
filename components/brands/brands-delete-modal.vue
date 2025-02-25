<script lang="ts" setup>
import { useDeleteBrand } from '~/composables/brands/delete-brand';

const { isOpen, brandToDelete, setBrandToDelete, execute, status } = useDeleteBrand()

const description = computed(() => `Вы действительно хотите удалить бренд "${brandToDelete.value?.title}"?`)

async function onClick() {
  await execute()
}
async function closeModal() {
  setBrandToDelete()
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    @update:open="closeModal()"
    title="Удаление бренда"
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
