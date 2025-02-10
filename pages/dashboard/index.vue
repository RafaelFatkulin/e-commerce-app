<script lang="ts" setup>
import DashboardTitle from '~/components/dashboard-page/dashboard-title.vue';

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <DashboardPage>
    <template #header>
      <DashboardTitle>Главная</DashboardTitle>
    </template>

    <div>
      <h2>Dashboard</h2>
    </div>
  </DashboardPage>
</template>
