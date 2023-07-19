import { defineStore } from 'pinia'
import { useUserStore } from '@/store/useUserStore.js'
import { getUser } from '@/services/user.js'

export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    isAuthenticated: false
  }),
  actions: {
    setIsAuthenticated(isAuthenticated) {
      this.isAuthenticated = isAuthenticated
    },
    async checkAuth() {
      try {
        const user = await getUser()
        useUserStore().setUser(user.data.user)
        this.isAuthenticated = true
      } catch (error) {
        this.isAuthenticated = false
        useUserStore().setUser(null)
      }
    }
  }
})
