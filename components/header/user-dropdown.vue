<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { useCurrentUser } from '~/composables/auth/current-user'
import { useAuthStore } from '~/stores/auth'

const { signOut } = useAuth()
const { user, setUser } = useAuthStore()

const { data } = await useCurrentUser()
const { execute: executeSignout } = await signOut()

watch(data, () => {
  if (data.value?.data) {
    setUser(data.value?.data)
  }
})

const items = ref<DropdownMenuItem[] | DropdownMenuItem[][]>([
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user-round-pen',
      to: '/profile',
    },
  ],
  ...(user && user.role === 'admin'
    ? [
        [
          {
            label: 'Go to dashboard',
            icon: 'i-lucide-circle-gauge',
            to: '/dashboard',
          },
        ],
      ]
    : []),
  [
    {
      label: 'Sign out',
      icon: 'i-lucide-log-out',
      async onSelect() {
        await executeSignout()
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
      :content="{
        align: 'end',
      }"
    >
      <UButton variant="ghost" color="neutral">
        <template #leading>
          <UIcon class="size-5 md:size-6" name="i-lucide-circle-user" />
        </template>
        <span>{{ user?.fullName }}</span>
      </UButton>
    </UDropdownMenu>

    <template #fallback>
      <USkeleton class="size-5 md:size-6 rounded-full" />
    </template>
  </ClientOnly>
</template>
