<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <DashboardPage>
    <template #header>
      <DashboardTitle>
        Товар #{{ $route.params.id }}
      </DashboardTitle>
    </template>

  </DashboardPage>
</template>