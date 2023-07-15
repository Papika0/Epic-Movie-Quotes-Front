import { createRouter, createWebHistory } from 'vue-router'
import { handleEmailVerification, handlePasswordResset, handleGoogleAuth, checkAuth } from '@/utils/authUtils';
import { movieGuard , quoteGuard } from '@/router/guards.js';
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import MoviesView from '@/views/MoviesView.vue'
import MovieDetailsView from '@/views/MovieDetailsView.vue'
import QuoteDetailsView from '@/views/QuoteDetailsView.vue'
import NewsFeedView from '@/views/NewsFeedView.vue'
import ForbiddenView from '@/views/ForbiddenView.vue'
import ErrorPageView from '@/views/ErrorPageView.vue'
import { useAuthStore } from '@/store/useAuthStore';


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
    },
    {
      path: '/movies',
      name: 'movies',
      beforeEnter: checkAuth,
      component: MoviesView
    },
    {
      path: "/movies/:id",
      name: "movie-details",
      beforeEnter: (to, from, next) => {
        checkAuth(to, from, () => {
          movieGuard(to, from, next);
        });
      },
      component: MovieDetailsView,
      props: true
    },
    {
      path: '/quotes/:id/:type',
      name: 'quote-details',
      beforeEnter: (to, from, next) => {
        checkAuth(to, from, () => {
          quoteGuard(to, from, next);
        });
      },
      component: QuoteDetailsView,
      props: true
    },
    {
      path: '/news-feed',
      name: 'news-feed',
      beforeEnter: checkAuth,
      component : NewsFeedView
    },
    {
      path: '/forbidden',
      name: 'forbidden',
      component: ForbiddenView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: ErrorPageView
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
