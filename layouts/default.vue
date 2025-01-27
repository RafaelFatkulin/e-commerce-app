<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <main class="flex-1 py-12">
      <slot />
    </main>
  </div>
</template>
