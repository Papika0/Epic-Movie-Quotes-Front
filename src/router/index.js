import { createRouter, createWebHistory } from 'vue-router'
import { handleEmailVerification } from '@/utils/authUtils';
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/email/verify/:id(.*)',
      name: 'verify-email',
      beforeEnter: handleEmailVerification
    },
  ]
})

export default router
