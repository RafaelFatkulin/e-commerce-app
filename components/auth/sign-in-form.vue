<script setup lang="ts">
import type { SignIn } from '~/types/auth'
import { signInSchema } from '~/schemas/auth'

const state = reactive<SignIn>({
  email: '',
  password: '',
})

const toast = useToast()
const router = useRouter()

const { signIn, updateCookies, updateUser, user } = useAuth()

const { data, status, error, clear, execute } = signIn({
  email: state.email,
  password: state.password,
})

watch(status, (value) => {
  if (value === 'success') {
    updateCookies({
      at: data.value?.data.accessToken || '',
      rt: data.value?.data.refreshToken || '',
    })
    updateUser(data.value?.data.user || null)

    toast.add({
      title: data.value?.message || undefined,
    })

    if (user.value?.role === 'admin') {
      router.push('/dashboard')
    }
  }
  if (value === 'error') {
    toast.add({
      title: 'Error',
      description: error.value?.message,
      color: 'error',
      icon: 'i-lucide-shield-alert',
    })
    clear()
  }
})
</script>

<template>
  <UForm
    :schema="signInSchema"
    :state
    class="space-y-5 pt-5"
    @submit="execute"
  >
    {{ state.email }} - {{ state.password }}
    <UFormField
      label="Email"
      name="email"
    >
      <UInput
        v-model="state.email"
        class="w-full"
        color="neutral"
        type="email"
      />
    </UFormField>

    <UFormField
      label="Password"
      name="password"
    >
      <UInput
        v-model="state.password"
        class="w-full"
        color="neutral"
        type="password"
      />
    </UFormField>

    <UButton
      :loading="status === 'pending' || status === 'success'"
      class="w-full items-center justify-center"
      color="neutral"
      icon="i-lucide-log-in"
      label="Sign In"
      type="submit"
    />
  </UForm>
</template>
