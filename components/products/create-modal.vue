<script lang="ts" setup>
import { useGetMinimalBrands } from '~/composables/brands/get-minimal-brands';
import { useGetMinimalCategories } from '~/composables/categories/get-minimal-categories';
import { useCreateProduct } from '~/composables/products/create-product';
import { createProductSchema } from '~/schemas/products';
import type { MinimalBrand } from '~/types/brands';
import type { MinimalCategory } from '~/types/categories';

const { isOpen, state, status, execute } = useCreateProduct()

const { data: brandsData, status: brandsStatus } = useGetMinimalBrands()
const { data: categoriesData, status: categoriesStatus } = useGetMinimalCategories(true)

const brandItems = computed<MinimalBrand[] | undefined>(() => brandsData.value?.data)
const categoriesItems = computed<MinimalCategory[] | undefined>(() => categoriesData.value?.data)

const loading = computed(() => status.value === 'pending')

async function onSubmit() {
  await execute()
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    title="Создание товара"
  >
    <UButton
      class="w-fit h-fit ml-auto"
      icon="i-lucide-circle-plus"
      label="Создать"
    />

    <template #body>
      <UForm
        :schema="createProductSchema"
        :state
        class="grid grid-cols-1 sm:grid-cols-2 gap-4"
        @submit="onSubmit"
      >
        <UFormField
          class="col-span-full"
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