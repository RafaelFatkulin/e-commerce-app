<script setup lang="ts">
import { useCurrentUser } from '~/composables/auth/current-user';

const { accessToken, refreshToken, user, updateCookies, updateUser } = useAuth()
const { execute } = await useCurrentUser()

onMounted(() => {
  if (refreshToken.value && !user) {
    execute()
  }
})
</script>

<template>
  <div class="h-screen grid grid-cols-1 lg:grid-cols-[240px_1fr]">
    <Sidebar />

    <main class="flex flex-col h-screen">
      <slot />
    </main>
  </div>
</template>
