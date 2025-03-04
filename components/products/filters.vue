<script lang="ts" setup>
import { useGetMinimalBrands } from '~/composables/brands/get-minimal-brands';
import { useGetMinimalCategories } from '~/composables/categories/get-minimal-categories';
import { useGetProducts } from '~/composables/products/get-products';
import type { MinimalBrand } from '~/types/brands';
import type { MinimalCategory } from '~/types/categories';

const { status, filter } = useGetProducts()
const { data: brandsData, status: brandsStatus } = useGetMinimalBrands()
const { data: categoriesData, status: categoriesStatus } = useGetMinimalCategories(true)

const loading = computed(() => status.value === 'pending')

const brandItems = computed<MinimalBrand[] | undefined>(() => brandsData.value?.data)
const categoriesItems = computed<MinimalCategory[] | undefined>(() => categoriesData.value?.data)
</script>

<template>
  <div
    class="grid grid-cols-1 min-[428px]:grid-cols-2 sm:grid-cols-3 md:flex md:flex-row gap-4 gapy-2"
  >
    <UInput
      v-model="filter.q"
      :loading
      icon="i-lucide-search"
      size="md"
      variant="outline"
      placeholder="Поиск по названию..."
      class="col-span-full sm:col-span-1 md:w-96"
    >
      <template
        v-if="filter.q?.length"
        #trailing
      >
        <UButton
          aria-label="Очистить поле"
          color="neutral"
          icon="i-lucide-circle-x"
          size="md"
          variant="link"
          @click="filter.q = ''"
        />
      </template>
    </UInput>

    <USelectMenu
      v-model="filter.brand_id"
      placeholder="Выберите бренд"
      icon="i-lucide-target"
      value-key="id"
      label-key="title"
      :loading="brandsStatus === 'pending' || loading"
      :items="brandItems"
      :ui="{
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
      }"
      class="md:w-48 md:min-w-48"
    >
      <template
        #trailing
        v-if="filter.brand_id"
      >
        <UButton
          aria-label="Очистить поле"
          color="neutral"
          icon="i-lucide-circle-x"
          size="md"
          variant="link"
          @click="filter.brand_id = undefined"
        />
      </template>
    </USelectMenu>

    <USelectMenu
      v-model="filter.category_id"
      placeholder="Выберите категорию"
      value-key="id"
      label-key="title"
      icon="i-lucide-grid-2x2"
      :loading="categoriesStatus === 'pending' || loading"
      :items="categoriesItems"
      :ui="{
        trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200'
      }"
      class="md:w-48 md:min-w-48"
    >
      <template
        #trailing
        v-if="filter.category_id"
      >
        <UButton
          aria-label="Очистить поле"
          color="neutral"
          icon="i-lucide-circle-x"
          size="md"
          variant="link"
          @click="filter.category_id = undefined"
        />
      </template>
    </USelectMenu>
  </div>
</template>