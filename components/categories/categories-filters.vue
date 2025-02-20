<script lang="ts" setup>
import { useGetCategories } from '~/composables/categories/get-categories'

const {
  status,
  filter,
} = await useGetCategories()
</script>

<template>
  <div class="flex flex-row gap-4 gap-y-2">
    <UInput
      v-model="filter.q"
      :loading="status === 'pending'"
      icon="i-lucide-search"
      size="md"
      variant="outline"
      placeholder="Поиск по названию..."
      class="w-full"
    >
      <template
        v-if="filter.q?.length"
        #trailing
      >
        <UButton
          aria-label="Очистить поле"
          color="neutral"
          icon="i-heroicons-x-circle"
          size="md"
          variant="link"
          @click="filter.q = ''"
        />
      </template>
    </UInput>
  </div>
</template>
