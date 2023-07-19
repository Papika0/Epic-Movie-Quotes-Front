import { defineStore } from 'pinia'
import { getGenres } from '@/services/movies.js'
import { getAllMovies } from '@/services/movies.js'

import router from '@/router/index.js'

export const useMovieStore = defineStore('useMovieStore', {
  state: () => ({
    genres: [],
    movies: []
  }),
  actions: {
    async getAllGenres() {
      try {
        await getGenres().then((res) => {
          res.data.forEach((genre) => {
            this.genres.push({ id: genre.id, label: genre.name })
          })
        })
      } catch (error) {
        return router.push({ name: 'not-found' })
      }
    },
    async getMovies() {
      try {
        await getAllMovies().then((data) => {
          this.movies = data
        })
      } catch (error) {
        return router.push({ name: 'not-found' })
      }
    }
  }
})
