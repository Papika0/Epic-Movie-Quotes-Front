import { defineStore } from 'pinia'

export const useUserStore = defineStore('useUserStore', {
  state: () => ({
    email: '',
    token: '',
    user: {}
  }),
  actions: {
    setEmail(email) {
      this.email = email
    },
    setToken(token) {
      this.token = token
    },
    setUser(user) {
      this.user = user
    }
  }
})
