import { defineStore } from 'pinia'
import { useUserStore } from '@/store/useUserStore.js'
import api from '@/plugins/axios/index.js'

export const useAuthStore = defineStore('useAuthStore', {
    state: () => ({
        isAuthenticated: false,
    }),
    actions: {
        setIsAuthenticated(isAuthenticated) {
            this.isAuthenticated = isAuthenticated;
        },
        async checkAuth() { 
            try {
                const user = await api.get('/user');
                useUserStore().setUser(user.data.user);
                useUserStore().setMoviesCount(user.data.movies_count);
                this.isAuthenticated = true;
            } catch (error) {
                this.isAuthenticated = false;
                useUserStore().setUser(null);
            }
        },
    },
});
