<script lang="ts" setup>
import { useCreateBrand } from '~/composables/brands/create-brand'
import { createBrandSchema } from '~/schemas/brands'

const { isOpen, state, status, execute } = useCreateBrand()

async function onSubmit() {
  await execute()
}

function handleFilesChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    state.files = Array.from(target.files)
  }
  else {
    state.files = []
  }
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="Создание бренда"
  >
    <UButton
      class="w-fit h-fit ml-auto"
      icon="i-lucide-circle-plus"
      label="Создать"
    />

    <template #body>
      <UForm
        :schema="createBrandSchema"
        :state
        class="flex flex-col gap-4"
        @submit="onSubmit"
      >
        <UFormField
          label="Медиа-файлы"
          name="files"
        >
          <UInput
            icon="i-lucide-file"
            class="w-full"
            type="file"
            multiple
            placeholder="Выберите файлы"
            @change="handleFilesChange"
          />
        </UFormField>

        <UFormField
          label="Название"
          name="title"
        >
          <UInput
            v-model="state.title"
            icon="i-lucide-text"
            class="w-full"
            placeholder="Введите название"
          />
        </UFormField>

        <UFormField
          class="col-span-full"
          label="Описание"
          name="description"
          hint="Необязательное поле"
        >
          <UTextarea
            v-model="state.description"
            class="w-full"
            placeholder="Введите описание"
          />
        </UFormField>

        <UButton
          class="h-fit self-end w-fit col-span-full ml-auto"
          icon="i-lucide-circle-plus"
          type="submit"
          :loading="status === 'pending'"
        >
          Создать
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>
