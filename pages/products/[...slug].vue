<script lang="ts" setup>
import type { RootCategory } from '~/types/categories'
import type { ErrorResponse, SuccessResponse } from '~/types/response'

const nuxtApp = useNuxtApp()
const route = useRoute()

const { data, status, error } = useAsyncData<
  SuccessResponse<RootCategory>,
  ErrorResponse
>('category-by-slug', async () =>
  nuxtApp.$api(`/categories/slug/${route.params.slug}`), {
})

useHead(() => ({
  title: data.value?.data.title,
}))
</script>

<template>
  <section>
    <UContainer>
      <div v-if="status === 'success'">
        <h1 class="font-bold text-3xl">
          {{ data?.data.title }}
        </h1>
        <p v-if="data?.data.description">
          {{ data.data.description }}
        </p>
        <div v-if="data?.data.parentId">
          child category
        </div>
        <div v-else>
          root category
        </div>
      </div>

      <div v-else-if="status === 'pending'">
        <USkeleton class="h-9 w-50" />
      </div>
    </UContainer>
  </section>
</template>
