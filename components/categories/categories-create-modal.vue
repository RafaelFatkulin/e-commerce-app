<script lang="ts" setup>
import { useCreateCategory } from '~/composables/categories/create-category'
import { createCategorySchema } from '~/schemas/categories'

const { isOpen, state, status, execute } = useCreateCategory()

const title = computed(() => state.parentId ? 'Создание подкатегории' : 'Создание категории')

function handleTitleChange() {
  if (state.title) {
    state.slug = translit(state.title)
  }
}

async function onSubmit() {
  await execute()
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title
  >
    <UButton
      class="w-fit h-fit ml-auto"
      icon="i-lucide-circle-plus"
      label="Создать"
    />

    <template #body>
      <UForm
        :schema="createCategorySchema"
        :state
        class="flex flex-col gap-4"
        @submit="onSubmit"
      >
        <UFormField
          label="Название"
          name="title"
        >
          <UInput
            v-model="state.title"
            icon="i-lucide-text"
            class="w-full"
            placeholder="Введите название"
            @change="handleTitleChange"
          />
        </UFormField>

        <UFormField
          label="Короткое название"
          name="shortTitle"
        >
          <UInput
            v-model="state.shortTitle"
            icon="i-lucide-text"
            class="w-full"
            placeholder="Введите короткое название"
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
