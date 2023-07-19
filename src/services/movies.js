import api from '@/plugins/axios/index.js'

export async function getAllMovies() {
  return api.get('/movies').then((response) => response.data)
}

export async function getGenres() {
  return await api.get('/genres')
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
  return await api
    .post('/movies', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => response.data)
}

export async function getMovie(id) {
  return await api.get(`/movies/${id}`).then((response) => response.data)
}

export async function deleteMovie(id) {
  return await api.delete(`/movies/${id}`).then((response) => response)
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
  return await api
    .post(`/movies/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => response.data)
}
