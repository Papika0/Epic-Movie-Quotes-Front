import { defineStore } from 'pinia'

export const useModalStore = defineStore('useModalStore', {
    state: () => ({
        showRegisterModal: false,
        showLoginModal: false,
    }),
    actions: {
        toggleRegisterModal() {
            this.showRegisterModal = !this.showRegisterModal
        },
        toggleLoginModal() {
            this.showLoginModal = !this.showLoginModal
        },
        switchLoginRegisterModal() {
            this.showLoginModal = !this.showLoginModal
            this.showRegisterModal = !this.showRegisterModal
        }   
    },
    getters: {
        getModalActiveState() {
            return this.showRegisterModal || this.showLoginModal
          }
    }
});
