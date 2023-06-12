import { defineStore } from 'pinia'

export const useUserStore = defineStore('useUserStore', {
    state: () => ({
        email: '',
    }),
    actions: {
        setEmail(email) {
            this.email = email;
        },
    },
    getters: {
        getEmailDomain(state) {
            const emailParts = state.email.split('@');
            return emailParts.length === 2 ? emailParts[1] : '';
        }   
    },
});


