<script lang="ts" setup>
const { items } = useNavigationLinks();
</script>

<template>
  <aside
    class="py-2 px-4 border-r border-[var(--ui-border)] hidden lg:flex flex-col sticky t-0 h-screen"
  >
    <div class="min-h-14 pb-2 flex items-center">
      <NuxtLink
        class="font-semibold px-3 transition-colors hover:text-[var(--ui-primary)]"
        to="/dashboard"
      >
        E-store
      </NuxtLink>
    </div>
    <div class="pt-4 flex flex-col flex-1">
      <UNavigationMenu
        :items
        class="flex-1"
        orientation="vertical"
      />
      <user-dropdown />
    </div>
  </aside>
</template>
