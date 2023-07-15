import { defineStore } from 'pinia'

export const useNewsFeedStore = defineStore('useNewsFeedStore', {
    state: () => ({
        searchValue: '',
        isFetchingQuotes: false,
    }),
});
