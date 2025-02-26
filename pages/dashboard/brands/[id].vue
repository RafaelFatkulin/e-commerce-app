<script lang="ts" setup>
import { useGetBrand } from '~/composables/brands/get-brand';
import { useUploadMediaBrand } from '~/composables/brands/upload-media-brand';

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const backLink = '/dashboard/brands'

const id = computed(() => Number(route.params.id))

const { data, refresh } = await useGetBrand(id.value)
const { handleMediaUpload } = useUploadMediaBrand(id.value, refresh)

useHead(() => ({
  title: `${data.value?.data.title} - Бренды`
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

    <div class="p-4 grid gap-8 grid-cols-1 lg:grid-cols-2 items-start">
      <BrandsGallery
        v-if="data?.data"
        :media="data?.data.media"
        @refresh="refresh"
        @add-files="handleMediaUpload"
      />
      <BrandsEditForm
        v-if="data?.data"
        :brand="data?.data"
        @refresh="refresh"
      />
    </div>
  </DashboardPage>
</template>