import { defineStore } from 'pinia'
import { getNotifications, markAllAsRead } from '@/services/notifications.js'
import router from '@/router/index.js'

export const useNotificationStore = defineStore('useNotificationStore', {
  state: () => ({
    notifications: [],
    showNotifications: false,
    remainingPages: 1,
    unreadNotifications: 0
  }),
  actions: {
    async getNotifications(page) {
      try {
        if (this.remainingPages === 0) return
        const notifications = await getNotifications(page)
        this.notifications = [...this.notifications, ...notifications.data.data]
        this.unreadNotifications = notifications.data.unread_notifications
        this.remainingPages = notifications.pages_left
      } catch (error) {
        return router.push({ name: 'not-found' })
      }
    },
    async markAllAsRead() {
      try {
        if (this.unreadNotifications === 0) return
        await markAllAsRead()
        this.unreadNotifications = 0
        this.notifications = this.notifications.map((notification) => {
          notification.read = 1
          return notification
        })
      } catch (error) {
        return router.push({ name: 'not-found' })
      }
    },
    toggleNotifications() {
      this.showNotifications = !this.showNotifications
    },
    addNotification(notification) {
      this.notifications.unshift(notification)
    }
  }
})
