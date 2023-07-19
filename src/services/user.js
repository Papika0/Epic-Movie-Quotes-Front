import api from '@/plugins/axios/index.js'

export async function changeLocale(locale) {
  return await api.get('/set-locale/' + locale)
}

export async function changeProfilePicture(file) {
  const formData = new FormData()
  formData.append('thumbnail', file)
  return api.post('/profile/upload-thumbnail', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export async function getUser() {
  return await api.get('/user')
}

export async function updateProfile(username, email, password) {
  return await api.post('/profile/update-profile', {
    username: username,
    email: email,
    password: password
  })
}
