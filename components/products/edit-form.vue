<script lang="ts" setup>
import { useGetMinimalBrands } from '~/composables/brands/get-minimal-brands';
import { useGetMinimalCategories } from '~/composables/categories/get-minimal-categories';
import { useEditProduct } from '~/composables/products/edit-product';
import { editProductSchema } from '~/schemas/products';
import type { Status } from '~/types/base';
import type { MinimalBrand } from '~/types/brands';
import type { MinimalCategory } from '~/types/categories';

const { state, status, execute } = await useEditProduct()
const { data: brandsData, status: brandsStatus } = useGetMinimalBrands()
const { data: categoriesData, status: categoriesStatus } = useGetMinimalCategories(true)

const brandItems = computed<MinimalBrand[] | undefined>(() => brandsData.value?.data)
const categoriesItems = computed<MinimalCategory[] | undefined>(() => categoriesData.value?.data)

function handleTitleChange() {
  if (state.value.title) {
    state.value.slug = translit(state.value.title)
  }
}

async function onSubmit() {
  await execute()
}

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

const loading = computed(() => status.value === 'pending')
</script>

<template>
  <UCard>
    <template #header>
      <h2
        class="text-base text-pretty font-semibold text-(--ui-text-highlighted)"
      >
        Редактирование товара
      </h2>
      <p class="text-sm text-pretty text-(--ui-text-muted)">
        Измените основные параметры товара
      </p>
    </template>

    <div>
      <UForm
        :schema="editProductSchema"
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
          label="Бренд"
          name="brandId"
        >
          <USelectMenu
            :portal="false"
            v-model="state.brandId"
            :search-input="{
              placeholder: 'Поиск...', disabled: false
            }"
            placeholder="Выберите бренд"
            icon="i-lucide-target"
            value-key="id"
            label-key="title"
            :loading="brandsStatus === 'pending' || loading"
            :items="brandItems"
            :ui="{
              content: 'z-50',
              trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
            }"
            class="w-full"
          >
            <template
              #trailing
              v-if="state.brandId"
            >
              <UButton
                aria-label="Очистить поле"
                color="neutral"
                icon="i-lucide-circle-x"
                size="md"
                variant="link"
                @click="state.brandId = undefined"
              />
            </template>
          </USelectMenu>
        </UFormField>

        <UFormField
          label="Категория"
          name="categoryId"
        >
          <USelectMenu
            :portal="false"
            v-model="state.categoryId"
            :search-input="{
              placeholder: 'Поиск...'
            }"
            placeholder="Выберите категорию"
            value-key="id"
            label-key="title"
            icon="i-lucide-grid-2x2"
            :loading="categoriesStatus === 'pending' || loading"
            :items="categoriesItems"
            :ui="{
              content: 'z-50',
              trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
            }"
            class="w-full"
          >
            <template
              #trailing
              v-if="state.categoryId"
            >
              <UButton
                aria-label="Очистить поле"
                color="neutral"
                icon="i-lucide-circle-x"
                size="md"
                variant="link"
                @click="state.categoryId = undefined"
              />
            </template>
          </USelectMenu>
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