import { createRouter, createWebHistory } from 'vue-router'
import { handleEmailVerification , handlePasswordResset } from '@/utils/authUtils';
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
    {
      path: '/reset-password/:id(.*)',
      name: 'reset-password',
      beforeEnter: handlePasswordResset
    },
  ]
})

export default router
