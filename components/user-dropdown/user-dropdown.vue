<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui'
import { useSignout } from '~/composables/auth/signout'

const { user } = useAuth()
const { execute } = await useSignout()

const items = ref<DropdownMenuItem[][]>([
  [
    {
      slot: 'header',
      type: 'label',
      label: user?.fullName || '',
    },
  ],
  [
    {
      label: 'На сайт',
      icon: 'i-lucide-app-window',
      to: '/',
    },
    {
      label: 'Настройки',
      icon: 'i-lucide-settings',
      to: '/settings',
    },
  ],
  [
    {
      label: 'Выйти',
      icon: 'i-lucide-log-out',
      onSelect: async () => await execute(),
    },
  ],
])
</script>

<template>
  <u-dropdown-menu :ui="{ content: 'min-w-50' }" :items="items">
    <u-button
      :label="user?.fullName"
      class="justify-between"
      color="neutral"
      trailing-icon="i-lucide-ellipsis-vertical"
      variant="ghost"
    />

    <template #header>
      <div class="flex flex-row w-full justify-between gap-2 items-center">
        <div class="flex flex-col">
          <span class="font-medium">{{ user?.fullName }}</span>
          <span class="font-normal text-[var(--ui-neutral-500)] text-xs">{{ user?.email }}</span>
        </div>
        <ThemeButton />
      </div>
    </template>
  </u-dropdown-menu>
</template>
