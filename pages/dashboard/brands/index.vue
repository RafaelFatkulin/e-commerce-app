<script lang="ts" setup>
import BransTable from '~/components/brands/brands-table.vue';

definePageMeta({
  layout: 'dashboard'
})

useHead(() => ({
  title: 'Бренды'
}))
</script>

<template>
  <DashboardPage>
    <template #header>
      <DashboardTitle>
        Бренды

        <template #button>
          <BrandsCreateModal />
        </template>
      </DashboardTitle>
    </template>

    <BransTable />
  </DashboardPage>
</template>
