import { defineStore } from 'pinia'

export const useUserStore = defineStore('useUserStore', {
  state: () => ({
    email: '',
    token: '',
    user: {},
    moviesCount: 0
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
    },
    setMoviesCount(count) {
      this.moviesCount = count
    }
  },
  getters: {
    getEmailDomain(state) {
      const emailParts = state.email.split('@')
      return emailParts.length === 2 ? emailParts[1] : ''
    }
  }
})
