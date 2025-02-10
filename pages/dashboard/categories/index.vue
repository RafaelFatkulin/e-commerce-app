<script lang="ts" setup>
import DashboardTitle from "~/components/dashboard-page/dashboard-title.vue";
import authGlobal from "~/middleware/auth.global";

definePageMeta({
  layout: "dashboard",
  middleware: [authGlobal],
});
</script>

<template>
  <DashboardPage>
    <template #header>
      <DashboardTitle>Категории</DashboardTitle>
    </template>

    <div class="p-4">
      <CategoriesTable />
    </div>
  </DashboardPage>
</template>
