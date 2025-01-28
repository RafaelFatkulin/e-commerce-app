import type { CurrentUser } from '~/types/auth'

export const useAuthStore = defineStore('auth', {
  state: (): { user: CurrentUser | null } => ({
    user: null,
  }),
  actions: {
    setUser(user: CurrentUser | null) {
      this.user = user
    },
  },
  persist: true,
})
