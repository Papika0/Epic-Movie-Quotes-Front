import { verifyEmail } from '@/services/auth/auth.js';
import { useModalStore } from '@/stores/useModalStore.js';

export async function handleEmailVerification(to, from, next) {
  const url = to.fullPath.substring(to.fullPath.indexOf('/', 0));
  try {
    await verifyEmail(url);
    useModalStore().toggleEmailVerifiedModal();
  } catch (error) { 
    // TODO: Add error handling
    console.error(error);
  }
  next({ name: 'home' });
}