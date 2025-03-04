<script lang="ts" setup>
import { ProductsCreateModal } from '#components';

definePageMeta({
  layout: 'dashboard',
})
</script>

<template>
  <DashboardPage>
    <template #header>
      <DashboardTitle>
        Товары

        <template #button>
          <ProductsCreateModal />
        </template>
      </DashboardTitle>
    </template>

    <ProductsTable />
  </DashboardPage>
</template>
