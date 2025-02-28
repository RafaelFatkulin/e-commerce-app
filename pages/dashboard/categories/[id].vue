<script lang="ts" setup>
import { useGetCategory } from '~/composables/categories/get-category'

definePageMeta({
  layout: 'dashboard',
})

const route = useRoute()

const { data, error } = await useGetCategory(Number(route.params.id))

useHead(() => ({
  title: `Категории - ${data.value?.data.title}`,
}))

const isSame = computed(
  () => data.value?.data.title === data.value?.data.shortTitle,
)
const hasParent = computed(() => data.value?.data.parentId)
const backLink = computed(() => {
  if (hasParent.value) {
    return `/dashboard/categories/${data.value?.data.parentId}`
  }
  return '/dashboard/categories'
})
</script>

<template>
  <DashboardPage>
    <template #header>
      <div class="flex flex-col">
        <DashboardTitle :back-to="backLink">
          {{ data?.data.title }}

          <template
            v-if="!isSame"
            #subtitle
          >
            {{ data?.data.shortTitle }}
          </template>
        </DashboardTitle>
      </div>
    </template>

    <div class="p-4 grid gap-8 grid-cols-1 lg:grid-cols-2 items-start">
      <CategoriesEditForm
        v-if="data?.data"
        :category="data?.data"
      />

      <CategoriesTable
        v-if="!hasParent"
        bordered
      />
    </div>
  </DashboardPage>
</template>
