import { defineStore } from 'pinia'

export const useModalStore = defineStore('useModalStore', {
  state: () => ({
    showRegisterModal: false,
    showLoginModal: false,
    showEmailSentModal: false,
    showEmailVerifiedModal: false,
    showEmailVerificationResendModal: false,
    showEmailForgotPasswordModal: false,
    showEmailForgotPasswordSendModal: false,
    showResetPasswordModal: false,
    showResetPasswordSuccessModal: false,
    showResetPasswordResendModal: false,
    showMovieAddModal: false,
    showMovieEditModal: false,
    showQuoteAddModal: false,
    showBurgerMenu: false,
    showProfileModal: false,
    showQuoteNewsFeed: false
  }),
  actions: {
    toggleRegisterModal() {
      this.showRegisterModal = !this.showRegisterModal
    },
    toggleLoginModal() {
      this.showLoginModal = !this.showLoginModal
    },
    toggleEmailSentModal() {
      this.showEmailSentModal = !this.showEmailSentModal
    },
    toggleEmailVerifiedModal() {
      this.showEmailVerifiedModal = !this.showEmailVerifiedModal
    },
    toggleEmailForgotPasswordModal() {
      this.showEmailForgotPasswordModal = !this.showEmailForgotPasswordModal
    },
    toggleEmailForgotPasswordSendModal() {
      this.showEmailForgotPasswordSendModal = !this.showEmailForgotPasswordSendModal
    },
    toggleResetPasswordModal() {
      this.showResetPasswordModal = !this.showResetPasswordModal
    },
    toggleResetPasswordSuccessModal() {
      this.showResetPasswordSuccessModal = !this.showResetPasswordSuccessModal
    },
    toggleResetPasswordResendModal() {
      this.showResetPasswordResendModal = !this.showResetPasswordResendModal
    },
    toggleEmailVerificationResendModal() {
      this.showEmailVerificationResendModal = !this.showEmailVerificationResendModal
    },
    switchLoginRegisterModal() {
      this.showLoginModal = !this.showLoginModal
      this.showRegisterModal = !this.showRegisterModal
    },
    toggleMovieAddModal() {
      this.showMovieAddModal = !this.showMovieAddModal
    },
    toggleMovieEditModal() {
      this.showMovieEditModal = !this.showMovieEditModal
    },
    toggleQuoteAddModal() {
      this.showQuoteAddModal = !this.showQuoteAddModal
    },
    toggleBurgerMenu() {
      this.showBurgerMenu = !this.showBurgerMenu
    },
    toggleProfileModal() {
      this.showProfileModal = !this.showProfileModal
    },
    toggleQuoteNewsFeed() {
      this.showQuoteNewsFeed = !this.showQuoteNewsFeed
    }
  },
  getters: {
    getModalActiveState() {
      return Object.values(this.$state).some((value) => value === true)
    }
  }
})
