<script lang="ts" setup>
import { useGetBrand } from '~/composables/brands/get-brand';
import { useMediaStatus } from '~/composables/media/media-status';
import type { Media } from '~/types/media';

const { media, labelled = false, dismissible = true } = defineProps<{
  media: Media
  labelled?: boolean
  dismissible?: boolean
}>()

const toast = useToast()

const {
  isOpen,
  setMediaToUpdateStatus,
  data,
  error,
  status,
  execute
} = useMediaStatus()

const { refresh } = useGetBrand()

const description = ref<string>('')

function openModal() {
  setMediaToUpdateStatus(media)

  const newStatus = media.status === 'active' ? 'нективный' : 'активный'
  description.value = `Вы действительно хотите изменить статус у "${media.alt}" на ${newStatus}?`
}

function closeModal() {
  setMediaToUpdateStatus()
}

async function onClick() {
  await execute()
}

watch(status, async () => {
  if (status.value === 'success') {
    toast.add({
      title: 'Успешно',
      description: data.value?.message as string,
      icon: 'i-lucide-circle-check',
      color: 'success'
    })
    setMediaToUpdateStatus()
    await refresh()
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
    title="Изменение статуса медиа-файла"
    :description
    :dismissible
  >
    <UTooltip
      text="Изменить статус"
      :disabled="labelled"
    >
      <UButton
        @click="openModal"
        icon="i-lucide-eye"
        variant="ghost"
        color="primary"
        :label="labelled ? 'Изменить статус' : ''"
      />
    </UTooltip>
    <template #body>
      <div class="flex flex-row items-center justify-end gap-4">

        <UButton
          icon="i-lucide-arrow-left-right"
          color="success"
          :loading="status === 'pending'"
          @click="onClick"
        >
          Изменить
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