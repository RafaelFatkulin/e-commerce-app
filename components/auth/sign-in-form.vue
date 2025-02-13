<script setup lang="ts">
import type { SignIn } from '~/types/auth'
import { useSignin } from '~/composables/auth/signin'
import { signInSchema } from '~/schemas/auth'

const emits = defineEmits<{
  closeModal: []
}>()

const state = reactive<SignIn>({
  email: '',
  password: '',
})

const toast = useToast()
const router = useRouter()
const form = useTemplateRef('form')

const { updateCookies } = useAuth()

const { setUser } = useAuthStore()

const { data, status, error, clear, execute } = useSignin(state)

watch(status, (value) => {
  if (value === 'success') {
    updateCookies({
      at: data.value?.data.accessToken || '',
      rt: data.value?.data.refreshToken || '',
      atExpiresAt: data.value?.data.accessExpiresAt,
      rtExpiresAt: data.value?.data.refreshExpiresAt,
    })

    if (data.value?.data.user) {
      setUser(
        data.value?.data.user,
      )
    }

    toast.add({
      title: data.value?.message || undefined,
    })

    if (data.value?.data.user.role === 'admin') {
      router.push('/dashboard')
    }

    emits('closeModal')
  }
  if (value === 'error') {
    if (error.value?.data?.errors) {
      let msg = ''
      Object.keys(error.value.data.errors).forEach((key) => {
        error?.value?.data?.errors[key]?._errors?.forEach((err) => {
          msg = `${msg} ${err}`
        })
      })

      toast.add({
        title: 'Error',
        description: msg.trim(),
        color: 'error',
        icon: 'i-lucide-shield-alert',
      })
    }
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
    ref="form"
    :schema="signInSchema"
    :state
    class="flex flex-col gap-4 pt-5"
    @submit="execute"
  >
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
      :disabled="!!form?.errors?.length"
      :loading="status === 'pending'"
      class="w-full items-center justify-center"
      color="neutral"
      icon="i-lucide-log-in"
      label="Sign In"
      type="submit"
    />
  </UForm>
</template>
