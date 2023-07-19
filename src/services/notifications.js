import api from '@/plugins/axios/index.js'

export async function getNotifications(page) {
  return await api.get(`/notifications/${page}`)
}

export async function markAsRead(id) {
  return await api.post(`/notifications/${id}/mark-as-read`)
}

export async function markAllAsRead() {
  return await api.post(`/notifications/mark-all-as-read`)
}
