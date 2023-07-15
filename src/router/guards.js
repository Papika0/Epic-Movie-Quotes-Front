import { getMovieById } from '@/services/movies.js';
import { getQuoteById } from '@/services/quotes.js';
import { useUserStore } from '@/store/useUserStore.js';

export async function movieGuard(to, _, next) {
    try {
      const data = await getMovieById(to.params.id);
      if (data.user_id !== useUserStore().user.id) {
        next({ name: 'forbidden' });
      } else {
        next();
      }
    } catch (error) {
      next({ name: 'not-found' });
    }
}

export async function quoteGuard(to, _, next) {
    try {
      const data = await getQuoteById(to.params.id);
      if (to.params.type === 'add') return next();
      if (data.user_id !== useUserStore().user.id) {
        next({ name: 'forbidden' });
      } else {
        next();
      }
    } catch (error) {
      next({ name: 'not-found' });
    }
}