<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import SignInForm from './sign-in-form.vue'
import SignUpForm from './sign-up-form.vue'

const { isLoggedIn } = useAuth()

const tabItems = ref<TabsItem[]>([
  {
    label: 'Sign in',
    slot: 'signin',
  },
  {
    label: 'I\'m new here',
    slot: 'signup',
  },
])
</script>

<template>
  <UModal :ui="{ content: '!max-w-[420px]' }">
    <UButton v-if="!isLoggedIn" variant="ghost" color="neutral">
      <template #leading>
        <UIcon class="size-5 md:size-6" name="i-lucide-circle-user" />
      </template>
    </UButton>
    <template #title>
      <h2 class="text-xl font-medium">
        Come on in
      </h2>
    </template>

    <template #body>
      <UTabs color="neutral" variant="link" :items="tabItems" :ui="{ label: 'uppercase sm:text-base cursor-pointer' } ">
        <template #signin>
          <SignInForm />
        </template>
        <template #signup>
          <SignUpForm />
        </template>
      </UTabs>
    </template>
  </UModal>
</template>
