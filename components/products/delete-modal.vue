<script lang="ts" setup>
import { useDeleteProduct } from '~/composables/products/delete-product';

const {
  isOpen,
  productToDelete,
  setProductToDelete,
  execute,
  status
} = useDeleteProduct()

const description = computed(() => `Вы действительно хотите удалить товар "${productToDelete.value?.title}"?`)

async function onClick() {
  await execute()
}

async function closeModal() {
  setProductToDelete()
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="Удаление товара"
    :description
    @update:open="closeModal()"
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