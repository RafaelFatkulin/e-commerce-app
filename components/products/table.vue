<script lang="ts" setup>
import { useGetProducts } from '~/composables/products/get-products';

const { data, status, error } = useGetProducts()


</script>


<template>
  <ProductsColumns v-slot="{ columns }">
    <UCard :ui="{
      root: '!border-0 ring-0 shadow-none rounded-none',
      body: 'flex flex-col gap-4',
      header: 'flex flex-row items-center',
    }">
      <ProductsFilters />

      <UTable
        :ui="{
          root: 'border border-[var(--ui-border)] rounded-[calc(var(--ui-radius)*2)] shadow-sm',
        }"
        :data="data?.data"
        :columns="columns"
        :loading="status === 'pending'"
      >
        <template #empty>
          <span v-if="error">{{ error.data?.message }}</span>
          <span v-else>Нет данных</span>
        </template>
      </UTable>
    </UCard>
  </ProductsColumns>
</template>