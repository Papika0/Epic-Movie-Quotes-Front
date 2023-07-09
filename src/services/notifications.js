import api from "@/plugins/axios/index.js";
import router from "@/router/index.js";

export async function getNotifications(page) {
    try {
        const notifications = await api.get(`/notifications/${page}`);
        return notifications.data;
    } catch (error) {
        return router.push({ name: "not-found" });
    }
}

export async function markAsRead(id) {
    try {
        const notifications = await api.post(`/notifications/${id}/mark-as-read`);
        return notifications.data;
    } catch (error) {
        return router.push({ name: "not-found" });
    }
}

export async function markAllAsRead() {
    try {
        const notifications = await api.post(`/notifications/mark-all-as-read`);
        return notifications.data;
    } catch (error) {
        return router.push({ name: "not-found" });
    }
}