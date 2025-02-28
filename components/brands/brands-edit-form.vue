<script lang="ts" setup>
import type { Status } from '~/types/base'
import type { EditBrand } from '~/types/brands'
import { useEditBrand } from '~/composables/brands/edit-brand'
import { useGetBrand } from '~/composables/brands/get-brand'
import { editBrandSchema } from '~/schemas/brands'

const { data: brandData, refresh } = await useGetBrand()

const state = reactive<Partial<EditBrand>>({
  title: brandData.value?.data.title,
  description: brandData.value?.data.description || undefined,
  slug: brandData.value?.data.slug,
  order: brandData.value?.data.order,
  status: brandData.value?.data.status,
})
const statusVariants = ref([
  {
    type: 'label',
    label: 'Выберите статус',
  },
  {
    label: 'Активна',
    value: 'active',
    chip: {
      color: 'success' as const,
    },
  },
  {
    label: 'Не активна',
    value: 'not-active',
    chip: {
      color: 'error' as const,
    },
  },
])
function getChip(value: Status) {
  return statusVariants.value.find(item => item.value === value)?.chip
}
const { data, error, status, execute } = await useEditBrand(state)
function handleTitleChange() {
  if (state.title) {
    state.slug = translit(state.title)
  }
}
async function onSubmit() {
  await execute()
}
const toast = useToast()
watch(status, async () => {
  if (status.value === 'success') {
    toast.add({
      title: 'Успешно',
      description: data.value?.message as string,
      icon: 'i-lucide-circle-check',
      color: 'success',
    })

    await refresh()
  }

  if (status.value === 'error') {
    toast.add({
      title: 'Ошибка',
      description: error.value?.data?.message as string,
      icon: 'i-lucide-circle-x',
      color: 'error',
    })
  }
})
</script>

<template>
  <UCard>
    <template #header>
      <h2
        class="text-base text-pretty font-semibold text-(--ui-text-highlighted)"
      >
        Редактирование бренда
      </h2>
      <p class="text-sm text-pretty text-(--ui-text-muted)">
        Измените основные параметры бренадхах
      </p>
    </template>

    <div>
      <UForm
        :schema="editBrandSchema"
        :state
        class="grid grid-cols-2 gap-4"
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
          label="ЧПУ"
          name="slug"
        >
          <UInput
            v-model="state.slug"
            icon="i-lucide-text"
            class="w-full"
            placeholder="Введите ЧПУ"
          />
        </UFormField>

        <UFormField
          label="Порядок"
          name="order"
        >
          <UInput
            v-model="state.order"
            icon="i-lucide-arrow-down-up"
            type="number"
            min="1"
            class="w-full"
          />
        </UFormField>

        <UFormField
          label="Статус"
          name="status"
        >
          <USelect
            v-model="state.status"
            :items="statusVariants"
            class="w-full"
          >
            <template #leading="{ modelValue, ui }">
              <UChip
                v-if="modelValue"
                v-bind="getChip(modelValue as Status)"
                inset
                standalone
                :size="ui.itemLeadingChipSize()"
                :class="ui.itemLeadingChip()"
              />
            </template>
          </USelect>
        </UFormField>

        <UFormField
          class="col-span-full"
          label="Описание"
          name="description"
        >
          <UTextarea
            v-model="state.description"
            class="w-full"
            placeholder="Введите описание"
          />
        </UFormField>

        <UButton
          class="h-fit self-end w-fit col-span-full ml-auto"
          icon="i-lucide-pencil"
          type="submit"
          :loading="status === 'pending'"
        >
          Редактировать
        </UButton>
      </UForm>
    </div>
  </UCard>
</template>
