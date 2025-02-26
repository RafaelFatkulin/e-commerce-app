<script lang="ts" setup>
import { useMediaDelete } from '~/composables/media/media-delete';
import type { Media } from '~/types/media';

const { media } = defineProps<{
  media: Media
}>()

const emits = defineEmits<{
  (e: 'refresh'): void
}>()

const toast = useToast()

const descriprion = computed(() => `Вы действительно хотите удалить "${media.alt}"?`)

const {
  isOpen,
  setMediaToDelete,
  data,
  error,
  status,
  execute,
} = useMediaDelete(media)

async function closeModal() {
  setMediaToDelete()
}
async function openModal() {
  setMediaToDelete(media)
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
      color: 'success'
    })
    setMediaToDelete()
    emits('refresh')
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
    v-modal:open="isOpen"
    @update:open="closeModal"
    title="Удаление медиа-файла"
    :description="descriprion"
  >
    <UButton
      @click="openModal"
      icon="i-lucide-x"
      variant="ghost"
      color="error"
    />

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