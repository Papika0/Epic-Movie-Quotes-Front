import { createRouter, createWebHistory } from 'vue-router'
import { handleEmailVerification , handlePasswordResset , handleGoogleAuth , checkAuth } from '@/utils/authUtils';
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import { useAuthStore } from '@/stores/useAuthStore';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
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
    {
      path: '/auth/google/:id(.*)',
      name: 'google-auth',
      beforeEnter: handleGoogleAuth
    },
    {
      path: "/profile",
      name: "profile",
      beforeEnter: checkAuth,
      component: ProfileView,
    }
  ]
});


router.beforeEach((_,__,next) => {
  useAuthStore().checkAuth().then(() => {
    if (useAuthStore().isAuthenticated) {
      useAuthStore().setIsAuthenticated(true);
      next();
  } else {
      useAuthStore().setIsAuthenticated(false);
      next();
  }});
});


export default router
