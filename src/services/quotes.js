import api from "@/plugins/axios/index.js";

export async function getQuoteById(id) {
  try {
    const quote = await api.get(`/quotes/${id}`);
    return quote.data;
  } catch (error) {
    return router.push({ name: "not-found" });
  }
}

export async function updateQuote(id, content_en, content_ka, thumbnail) {
  try {
    const formData = new FormData();
    formData.append('content_en', content_en);
    formData.append('content_ka', content_ka);
    if (thumbnail)
      { formData.append('thumbnail', thumbnail) }
    const quote = await api.post(`/quotes/${id}/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return quote.data;
  } catch (error) {
    return router.push({ name: "not-found" });
  }
}

export async function deleteQuoteById(id) {
  try {
    const quote = await api.delete(`/quotes/${id}/delete`);
    return quote.data;
  } catch (error) {
    return router.push({ name: "not-found" });
  }
}

export async function createQuote(content_en, content_ka, thumbnail , movie_id) {
  try {
    const formData = new FormData();
    formData.append('content_en', content_en);
    formData.append('content_ka', content_ka);
    formData.append('thumbnail', thumbnail);
    formData.append('movie_id', movie_id);
    const quote = await api.post(`/quotes/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return quote.data;
  } catch (error) {
    return router.push({ name: "not-found" });
  }
}

export async function addComment(id, content) {
  try {
    const comment = await api.post(`/quotes/${id}/create-comment`, {
      content: content,
    });
    return comment.data;
  } catch (error) {
    return router.push({ name: "not-found" });
  }
}

export async function likeQuote(id) {
  try {
    const quote = await api.post(`/quotes/${id}/like`);
    return quote.data;
  } catch (error) {
    return router.push({ name: "not-found" });
  }
}

export async function dislikeQuote(id) {
  try {
    const quote = await api.post(`/quotes/${id}/unlike`);
    return quote.data;
  } catch (error) {
    return router.push({ name: "not-found" });
  }
}

export async function getQuotes(id) {
  try {
    const quotes = await api.get(`/quotes/${id}/get-quotes`);
    return quotes.data;
  } catch (error) {
    return router.push({ name: "not-found" });
  }
}