import api from '@/plugins/axios/index.js'

export async function getQuote(id) {
  return await api.get(`/quotes/${id}`)
}

export async function updateQuote(id, content_en, content_ka, thumbnail) {
  const formData = new FormData()
  formData.append('content[en]', content_en)
  formData.append('content[ka]', content_ka)
  if (thumbnail) {
    formData.append('thumbnail', thumbnail)
  }
  return await api.post(`/quotes/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export async function deleteQuote(id) {
  await api.delete(`/quotes/${id}`)
}

export async function createQuote(content_en, content_ka, thumbnail, movie_id) {
  const formData = new FormData()
  formData.append('content[en]', content_en)
  formData.append('content[ka]', content_ka)
  formData.append('thumbnail', thumbnail)
  formData.append('movie_id', movie_id)
  return await api.post('/quotes/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export async function addComment(id, content) {
  return await api.post(`/comment/${id}`, {
    content: content
  })
}

export async function likeQuote(id) {
  return await api.post(`/quotes/${id}/like`)
}

export async function dislikeQuote(id) {
  return await api.post(`/quotes/${id}/unlike`)
}

export async function getQuotes(page) {
  return await api.get(`/quotes/page/${page}`)
}
