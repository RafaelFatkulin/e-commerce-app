<script lang="ts" setup>
import { useGetBrand } from '~/composables/brands/get-brand';
import { useMediaDelete } from '~/composables/media/media-delete';
import type { Media } from '~/types/media';

const { media, labelled = false } = defineProps<{
  media: Media
  labelled?: boolean

}>()

const route = useRoute()
const toast = useToast()

const {
  isOpen,
  setMediaToDelete,
  data,
  error,
  status,
  execute,
} = useMediaDelete()
const { refresh } = useGetBrand(Number(route.params.id))

const description = ref<string>('')

async function openModal() {
  setMediaToDelete(media)
  description.value = `Вы действительно хотите удалить "${media.alt}"?`
}

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
      color: 'success'
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
    @update:open="closeModal"
    title="Удаление медиа-файла"
    :description
  >
    <UTooltip text="Удалить изображение">
      <UButton
        @click="openModal"
        icon="i-lucide-x"
        variant="ghost"
        color="error"
        :label="labelled ? 'Удалить изображение' : ''"
      />
    </UTooltip>
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