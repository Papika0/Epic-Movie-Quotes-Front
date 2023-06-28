import api from "@/plugins/axios/index.js";

export async function getAllMovies() {
    try {
        const movies = await api.get("/movies");
        return movies.data;
    } catch (error) {
        return error.response.data;
    }
}

export async function getGenres() {
    try {
        const genres = await api.get("/genres");
        return genres;
    } catch (error) {
        return error.response.data;
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
      const formData = new FormData();
      formData.append('name_en', name_en);
      formData.append('name_ka', name_ka);
      formData.append('genre_ids', genre_ids);
      formData.append('release_year', year);
      formData.append('director_en', director_en);
      formData.append('director_ka', director_ka);
      formData.append('description_en', description_en);
      formData.append('description_ka', description_ka);
      formData.append('thumbnail', thumbnail);
  
      const response = await api.post('/movies/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
}
  
export async function getMovieById(id) {
    try {
        const movie = await api.get(`/movies/${id}`);
        return movie.data;
    } catch (error) {
        return error.response.data;
    }
}