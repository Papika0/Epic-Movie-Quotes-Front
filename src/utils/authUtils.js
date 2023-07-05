import { verifyEmail , authGoogle } from '@/services/auth/auth.js';
import { useModalStore } from '@/stores/useModalStore.js';
import { useUserStore } from '@/stores/useUserStore.js';
import { useAuthStore } from '@/stores/useAuthStore.js';

export async function handleEmailVerification(to, from, next) {
  const veryfyLink = to.fullPath.split('?email=')[0];
  const email = to.fullPath.split('?email=')[1];
  try {
    await verifyEmail(veryfyLink);
    if (useAuthStore().isAuthenticated) {
      next({ name: 'news-feed' });
    } else useModalStore().toggleEmailVerifiedModal();
  } catch (error) { 
    useUserStore().setEmail(email);
    useModalStore().toggleEmailVerificationResendModal();
  }
  next({ name: 'home' });
}


export async function handlePasswordResset(to, from, next) {
  const regex = /reset-password\/(?<token>[^?]+)\?email=(?<email>[^&]+)/;
  const match = to.fullPath.match(regex);

  const token = match?.groups?.token || null;
  const email = match?.groups?.email || null;

  useUserStore().setEmail(email);
  useUserStore().setToken(token);

  useModalStore().toggleResetPasswordModal();
  
  next({ name: 'home' });
}

export async function handleGoogleAuth(to,_,next) {
  try {
    await authGoogle(to.fullPath);
    useAuthStore().setIsAuthenticated(true);
    next({ name: 'news-feed' });
  } catch (error) {
    console.log(error);
  }
}

// TO Do: forbidden page
export async function checkAuth(_, __, next) {
 await useAuthStore().checkAuth().then(() => {
    if (useAuthStore().isAuthenticated) {
      next();
    } else {
      next({ name: 'forbidden' });
    }
  });
}
