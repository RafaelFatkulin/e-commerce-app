<script lang="ts" setup>
import { useGetBrand } from '~/composables/brands/get-brand'

definePageMeta({
  layout: 'dashboard',
})

const backLink = '/dashboard/brands'

const { data } = await useGetBrand()

useHead(() => ({
  title: `${data.value?.data.title} - Бренды`,
}))
</script>

<template>
  <DashboardPage>
    <template #header>
      <div class="flex flex-col">
        <DashboardTitle :back-to="backLink">
          {{ data?.data.title }}
        </DashboardTitle>
      </div>
    </template>

    <div class="p-4 grid gap-8 grid-cols-1 xl:grid-cols-2 items-start">
      <BrandsEditForm />
      <BrandsGallery />
    </div>
  </DashboardPage>
</template>
