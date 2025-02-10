<script lang="ts" setup>
import { useNavigationLinks } from "~/composables/navigation-links";

const { items } = useNavigationLinks()
</script>

<template>
  <USlideover
      :close="{
        color: 'neutral',
        variant: 'ghost',
        icon: 'i-lucide-menu',
        class: 'mr-auto'
      }"
      :ui="{
        header: 'py-2 px-4 sm:py-2 sm:px-4 flex flex-row gap-2 min-h-16 items-center',
        body: 'py-2 px-4 sm:py-2 sm:px-4',
        close: 'left-4',
        title: 'pl-10 text-base flex flex-row items-center gap-2'
      }"
      side="left"
      title="Beavers"
  >
    <UButton class="flex lg:hidden" color="neutral" icon="i-lucide-menu" variant="ghost"/>

    <template #body>
      <UNavigationMenu :items orientation="vertical"/>
    </template>
  </USlideover>
</template>

<style scoped>

</style>