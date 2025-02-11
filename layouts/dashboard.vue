<script setup lang="ts"></script>

<template>
  <div class="h-screen grid grid-cols-1 lg:grid-cols-[240px_1fr]">
    <Sidebar />

    <main class="flex flex-col h-screen">
      <slot />
    </main>
  </div>
</template>
