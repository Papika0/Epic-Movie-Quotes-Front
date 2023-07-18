import api from '@/plugins/axios/index.js'
import router from '@/router/index.js'

export async function getAllMovies() {
  try {
    const movies = await api.get('/movies')
    return movies.data
  } catch (error) {
    return router.push({ name: 'not-found' })
  }
}

export async function getGenres() {
  try {
    const genres = await api.get('/genres')
    return genres
  } catch (error) {
    return router.push({ name: 'not-found' })
  }
}

export async function createMovie(
  name_en,
  name_ka,
  genre_ids,
  year,
  director_en,
  director_ka,
  description_en,
  description_ka,
  thumbnail
) {
  try {
    const formData = new FormData()
    formData.append('name[en]', name_en)
    formData.append('name[ka]', name_ka)
    genre_ids.forEach((id, index) => {
      formData.append(`genre_ids[${index}]`, id)
    })
    formData.append('release_year', year)
    formData.append('director[en]', director_en)
    formData.append('director[ka]', director_ka)
    formData.append('description[en]', description_en)
    formData.append('description[ka]', description_ka)
    formData.append('thumbnail', thumbnail)
    const response = await api.post('/movies/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    return router.push({ name: 'not-found' })
  }
}

export async function getMovieById(id) {
  try {
    const movie = await api.get(`/movies/${id}`)
    return movie.data
  } catch (error) {
    return router.push({ name: 'not-found' })
  }
}

export async function deleteMovie(id) {
  try {
    const movie = await api.delete(`/movies/${id}/delete`)
    return movie
  } catch (error) {
    return router.push({ name: 'not-found' })
  }
}

export async function updateMovie(
  id,
  name_en,
  name_ka,
  genre_ids,
  year,
  director_en,
  director_ka,
  description_en,
  description_ka,
  thumbnail
) {
  try {
    const formData = new FormData()
    formData.append('name[en]', name_en)
    formData.append('name[ka]', name_ka)
    genre_ids.forEach((id, index) => {
      formData.append(`genre_ids[${index}]`, id)
    })
    formData.append('release_year', year)
    formData.append('director[en]', director_en)
    formData.append('director[ka]', director_ka)
    formData.append('description[en]', description_en)
    formData.append('description[ka]', description_ka)
    if (thumbnail) {
      formData.append('thumbnail', thumbnail)
    }
    const movie = await api.post(`/movies/${id}/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return movie.data
  } catch (error) {
    return router.push({ name: 'not-found' })
  }
}
