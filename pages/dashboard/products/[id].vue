<script lang="ts" setup>
import { useGetProduct } from '~/composables/products/get-product';

definePageMeta({
  layout: 'dashboard'
})

const backLink = '/dashboard/products'

const { data } = await useGetProduct()

useHead(() => ({
  title: `${data.value?.data.title} - Товары`,
}))
</script>

<template>
  <DashboardPage>
    <template #header>
      <DashboardTitle :back-to="backLink">
        {{ data?.data.title }}
      </DashboardTitle>
    </template>

    <div class="p-4 grid gap-8 grid-cols-1 xl:grid-cols-2 items-start">
      <ProductsEditForm />
    </div>
  </DashboardPage>
</template>