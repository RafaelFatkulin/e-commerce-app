<script lang="ts" setup>
import { useGetBrand } from '~/composables/brands/get-brand'
import { useMediaDelete } from '~/composables/media/media-delete'

const toast = useToast()

const {
  isOpen,
  mediaToDelete,
  setMediaToDelete,
  data,
  error,
  status,
  execute,
} = useMediaDelete()
const { refresh } = useGetBrand()

const description = ref<string>('')

watch(mediaToDelete, (newMedia) => {
  if (newMedia) {
    description.value = `Вы действительно хотите удалить "${newMedia.alt}"?`
  }
})

async function closeModal() {
  setMediaToDelete()
}

async function onClick() {
  await execute()
}

watch(status, () => {
  if (status.value === 'success') {
    toast.add({
      title: 'Успешно',
      description: data.value?.message as string,
      icon: 'i-lucide-circle-check',
      color: 'success',
    })
    setMediaToDelete()
    refresh()
  }

  if (status.value === 'error') {
    if (status.value === 'error') {
      if (error.value?.data?.errors) {
        toast.add({
          title: error.value?.data?.message as string,
          description: error.value?.data?.errors.reduce((acc, curr) => {
            return acc.concat(`${curr.message}\n`)
          }, ''),
          icon: 'i-lucide-circle-x',
          color: 'error',
        })
      }
      else {
        toast.add({
          title: 'Ошибка',
          description: error.value?.data?.message as string,
          icon: 'i-lucide-circle-x',
          color: 'error',
        })
      }
    }
  }
})
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="Удаление медиа-файла"
    :description
    @update:open="closeModal"
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
