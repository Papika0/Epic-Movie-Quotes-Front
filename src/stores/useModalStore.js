import { defineStore } from 'pinia'

export const useModalStore = defineStore('useModalStore', {
    state: () => ({
        showRegisterModal: false,
        showLoginModal: false,
        showEmailSentModal: false,
        showEmailVerifiedModal: false,
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
        switchLoginRegisterModal() {
            this.showLoginModal = !this.showLoginModal
            this.showRegisterModal = !this.showRegisterModal
        }   
    },
    getters: {
        getModalActiveState() {
            return this.showRegisterModal || this.showLoginModal || this.showEmailSentModal || this.showEmailVerifiedModal
          }
    }
});
