<script lang="ts" setup>
import { useGetCategory } from '~/composables/categories/get-category';

definePageMeta({
  layout: 'dashboard',
})

const route = useRoute()

const {
  data,
  status,
  error
} = await useGetCategory(Number(route.params.id))

useHead(() => ({
  title: `Категории - ${data.value?.data.title}`
}))

const isSame = computed(() => data.value?.data.title === data.value?.data.shortTitle)

</script>

<template>
  <DashboardPage>
    <template #header>
      <div class="flex flex-col">
        <DashboardTitle>{{ data?.data.title }}</DashboardTitle>
        <span
          class="text-sm text-[var(--ui-text-muted)]"
          v-if="!isSame"
        >{{ data?.data.shortTitle }}</span>
      </div>
      <UButton>tet</UButton>
    </template>
  </DashboardPage>
</template>