<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
})

</script>

<template>
  <DashboardPage>
    <template #header>
      <DashboardTitle>Категории</DashboardTitle>
    </template>

    <CategoriesTable />
  </DashboardPage>
</template>
