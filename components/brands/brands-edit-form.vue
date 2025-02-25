<script lang="ts" setup>
import { useEditBrand } from '~/composables/brands/edit-brand';
import { useEditCategory } from '~/composables/categories/edit-category';
import { editBrandSchema } from '~/schemas/brands';
import type { Status } from '~/types/base';
import type { BrandWithMedia, EditBrand } from '~/types/brands';

const { brand } = defineProps<{
  brand: BrandWithMedia
}>()
const state = reactive<Partial<EditBrand>>({
  title: brand.title,
  description: brand.description || undefined,
  slug: brand.slug,
  order: brand.order,
  status: brand.status
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
const { status, execute } = await useEditBrand(state)
const handleTitleChange = () => {
  if (state.title) {
    state.slug = translit(state.title)
  }
}
const onSubmit = async () => {
  await execute()
}
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