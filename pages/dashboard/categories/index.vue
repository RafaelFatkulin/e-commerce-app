<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
})
</script>

<template>
  <DashboardPage>
    <template #header>
      <DashboardTitle>
        Категории

        <template #button>
          <CategoriesCreateModal />
        </template>
      </DashboardTitle>
    </template>

    <CategoriesTable />
  </DashboardPage>
</template>
