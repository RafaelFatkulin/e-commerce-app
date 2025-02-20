<script lang="ts" setup>
import type { FormSubmitEvent, SelectMenuItem } from '@nuxt/ui';
import { useEditCategory } from '~/composables/categories/edit-category';
import { useGetRootCategories } from '~/composables/categories/get-root-categories';
import { editCategorySchema } from '~/schemas/categories';
import type { CategoryStatus, EditCategory, RootCategory } from '~/types/categories';

const { category } = defineProps<{
  category: RootCategory
}>()

const { data: categories, status } = useGetRootCategories()

const categoryVariants = computed(() => {
  const items = [{
    type: 'label',
    label: 'Выберите родительскую категорию'
  }]
  const itemsFromData = categories.value?.data.map(category => ({
    label: category.title,
    value: category.id
  }))

  return [...items, ...(itemsFromData || [])]
})

const statusVariants = ref([
  {
    type: 'label',
    label: 'Выберите статус'
  },
  {
    label: 'Активна',
    value: 'active',
    chip: {
      color: 'success' as const
    }
  }, {
    label: 'Не активна',
    value: 'not-active',
    chip: {
      color: 'error' as const
    }
  }])

const state = reactive<Partial<EditCategory>>({
  title: category.title,
  shortTitle: category.shortTitle,
  description: category.description || undefined,
  parentId: category.parentId === null ? undefined : category.parentId,
  slug: category.slug,
  order: category.order,
  status: category.status
})


const { data, status: editStatus, execute } = await useEditCategory(state)

async function onSubmit(event: FormSubmitEvent<EditCategory>) {
  console.log(event.data)
  await execute()
}

function getChip(value: CategoryStatus) {
  return statusVariants.value.find(item => item.value === value)?.chip
}

function handleTitleChange() {
  if (state.title) {
    state.slug = translit(state.title)
  }
}

</script>

<template>
  <UCard>
    <template #header>
      <h2
        class="text-base text-pretty font-semibold text-(--ui-text-highlighted)"
      >
        Редактирование категории
      </h2>
      <p class="text-sm text-pretty text-(--ui-text-muted)">
        Измените основные параметры категории
      </p>
    </template>

    <div class="h-full">
      <UForm
        :schema="editCategorySchema"
        :state
        class="grid grid-cols-2 gap-4"
        @submit="onSubmit"
      >
        <UFormField
          label="Название"
          name="title"
        >
          <UInput
            icon="i-lucide-text"
            class="w-full"
            v-model="state.title"
            placeholder="Введите название"
            v-on:change="handleTitleChange"
          />
        </UFormField>

        <UFormField
          label="Короткое название"
          name="shortTitle"
        >
          <UInput
            icon="i-lucide-text"
            class="w-full"
            v-model="state.shortTitle"
            placeholder="Введите короткое название"
          />
        </UFormField>

        <UFormField
          label="ЧПУ"
          name="slug"
        >
          <UInput
            icon="i-lucide-text"
            class="w-full"
            v-model="state.slug"
            placeholder="Введите ЧПУ"
          />
        </UFormField>

        <UFormField
          v-if="category.parentId"
          label="Родительская категория"
          name="parentId"
        >
          <USelectMenu
            :model-value="state.parentId"
            :items="categoryVariants || []"
            :loading="status === 'pending'"
            value-key="value"
            label-key="label"
            icon="i-lucide-users"
            class="w-full"
            :ui="{
              trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
            }"
          />
        </UFormField>

        <UFormField
          label="Порядок"
          name="order"
        >
          <UInput
            icon="i-lucide-arrow-down-up"
            type="number"
            min="1"
            v-model="state.order"
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
                v-bind="getChip(modelValue as CategoryStatus)"
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
            class="w-full"
            v-model="state.description"
            placeholder="Введите описание"
          />
        </UFormField>

        <UButton
          class="h-fit self-end w-fit col-span-full ml-auto"
          icon="i-lucide-pencil"
          type="submit"
          :loading="editStatus === 'pending'"
        >
          Редактировать
        </UButton>
      </UForm>
    </div>
  </UCard>
</template>