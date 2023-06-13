import { defineStore } from 'pinia'

export const useUserStore = defineStore('useUserStore', {
    state: () => ({
        email: '',
        token: '',
    }),
    actions: {
        setEmail(email) {
            this.email = email;
        },
        setToken(token) {
            this.token = token;
        }
    },
    getters: {
        getEmailDomain(state) {
            const emailParts = state.email.split('@');
            return emailParts.length === 2 ? emailParts[1] : '';
        }   
    },
});


