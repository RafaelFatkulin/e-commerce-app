<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { useSignout } from '~/composables/auth/signout'
import { useAuthStore } from '~/stores/auth'

const { execute } = await useSignout()
const { user } = useAuth()

const items = ref<DropdownMenuItem[] | DropdownMenuItem[][]>([
  [
    {
      label: 'Профиль',
      icon: 'i-lucide-user-round-pen',
      to: '/profile',
    },
    {
      label: 'Панель',
      icon: 'i-lucide-circle-gauge',
      to: '/dashboard',
    },
  ],
  [
    {
      label: 'Выйти',
      icon: 'i-lucide-log-out',
      async onSelect() {
        await execute()
      },
    },
  ],
])
</script>

<template>
  <ClientOnly>
    <UDropdownMenu
      arrow
      :items
      :ui="{ content: 'min-w-40' }"
      :content="{
        align: 'end',
      }"
    >
      <UButton
        variant="ghost"
        color="neutral"
      >
        <template #leading>
          <UIcon
            class="size-5 md:size-6"
            name="i-lucide-circle-user"
          />
        </template>
        <span>{{ user?.fullName }}</span>
      </UButton>
    </UDropdownMenu>

    <template #fallback>
      <USkeleton class="size-5 md:size-6 rounded-full" />
    </template>
  </ClientOnly>
</template>
