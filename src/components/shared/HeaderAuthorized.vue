<template>
    <nav class="bg-header h-86">
        <header class="flex flex-row justify-between mx-16 pt-6 ">
            <p class="text-header my-auto" @click="router.push({ name: 'home' })">MOVIE QUOTES</p>
            <div class="flex flex-row gap-4">
                <div class="relative my-auto cursor-pointer" @click="openModal" ref="bellRef">
                    <IconNotificationBell class="my-auto" />
                    <div class="absolute top-0 right-0 mt-1 mr-1">
                        <div class="relative flex items-center justify-center">
                            <IconNotificationEclipse class="absolute" />
                            <p class="absolute text-white">{{ notificationsCount }}</p>
                        </div>
                    </div>
                </div>

                <div v-if="notificationStore.showNotifications"
                    class="absolute w-[961px] h-[812px] bg-black rounded-xl z-50 mt-[70px] mr-16 right-0"
                    ref="notificationContainerRef">
                    <IconBlackPolygon class="absolute mr-[195px] right-0 mt-[-20px] -z-20" />

                    <div class="pt-10 pb-14 px-8 flex flex-col max-h-[812px] gap-4 overflow-y-scroll" @scroll="scrolling">
                        <div class="inline-flex justify-between my-auto mb-2">
                            <p class="text-white text-[32px] font-medium capitalize leading-10">Notifications</p>
                            <p class="text-white text-[20px] font-normal underline leading-loose cursor-pointer"
                                @click="notificationStore.markAllAsRead()">
                                Mark as all read
                            </p>
                        </div>

                        <div v-for="notification in notifications" :key="notification.id"
                            class="w-full h-[117px] border border-gray-500 border-opacity-50 bg-black px-6 py-5 inline-flex gap-6 cursor-pointer"
                            @click="goToQuote(notification.id, notification.quote_id)">
                            <img :src="userThumbnail(notification.from.thumbnail)" alt="thumbnail"
                                class="w-20 h-20 rounded-full my-auto "
                                :class="{ 'border-2 border-green-700': notification.read == false }" />

                            <div class="flex flex-row justify-between my-auto w-full">
                                <div class="flex flex-col gap-1">
                                    <p class="text-white text-[20px] font-normal leading-loose">{{
                                        notification.from.username }}</p>

                                    <div class="inline-flex gap-3">
                                        <IconQuoteSymbol class="my-auto w-6 h-6" v-if="notification.type == 'comment'" />
                                        <IconHeartFilled class="my-auto w-6 h-6" v-else />
                                        <p class="text-gray-300 text-[20px] font-normal leading-loose"
                                            v-if="notification.type == 'comment'">Commented to your
                                            movie quote</p>
                                        <p class="text-gray-300 text-[20px] font-normal leading-loose" v-else>Reacted to
                                            your
                                            quote</p>
                                    </div>
                                </div>

                                <div class="flex flex-col gap-2">
                                    <p class="text-gray-300 text-[20px] font-normal leading-loose">{{
                                        notification.created }}</p>
                                    <p v-show="notification.read == false"
                                        class="text-green-700 text-[20px] font-normal leading-loose text-right">New</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <LanguageDropDown />
                <ButtonDark :text="$t('auth.log_out')" @click="logOut()" />
            </div>

        </header>
    </nav>
</template>

<script setup>
import ButtonDark from '@/components/ui/ButtonDark.vue';
import IconNotificationBell from '@/components/icons/header/IconNotificationBell.vue';
import LanguageDropDown from '@/components/shared/LanguageDropDown.vue';
import IconNotificationEclipse from '@/components/icons/header/IconNotificationEclipse.vue';
import IconBlackPolygon from '@/components/icons/header/IconBlackPolygon.vue';
import IconQuoteSymbol from '@/components/icons/movie/IconQuoteSymbol.vue';
import IconHeartFilled from '@/components/icons/header/IconHeartFilled.vue';
import { logout } from '@/services/auth/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import { useUserStore } from '@/stores/useUserStore';
import router from '@/router/index.js';
import instantiatePusher from "@/helpers/instantiatePusher.js";
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { markAsRead } from '@/services/notifications.js';
import { useNotificationStore } from '@/stores/useNotificationStore';

const notificationStore = useNotificationStore();
const pusherActive = ref(false);
const notificationContainerRef = ref(null);
const bellRef = ref(null);

const page = ref(2);

const notifications = ref([]);

const notificationsCount = computed(() => {
    return notificationStore.unreadNotifications;
});

const openModal = () => {
    notificationStore.toggleNotifications();
    document.addEventListener('click', handleOutsideClick);
}

async function logOut() {
    await logout().then(() => {
        useAuthStore().setIsAuthenticated(false);
        router.push({ name: 'home' });
    });
}

function goToQuote(id, quoteId) {
    markAsRead(id).then((data) => {
        notifications.value.find((notification) => {
            return notification.id === data.notification.id;
        }).read = data.notification.read;
    });
    router.push({ name: 'quote-details', params: { id: quoteId, type: 'view' } });
}

const userThumbnail = ((thumbnail) => import.meta.env.VITE_API_AUTH_URL + thumbnail);

const scrolling = (e) => {
    const clientHeight = e.target.clientHeight
    const scrollHeight = e.target.scrollHeight
    const scrollTop = e.target.scrollTop

    if (scrollTop + clientHeight >= scrollHeight) {
        notificationStore.getNotifications(page.value);
        page.value++;
    }
}

function initializePusher() {
    pusherActive.value = instantiatePusher();
    if (pusherActive.value) {
        window.Echo.private(`notifications.${useUserStore().user.id}`).listen(
            "NotificationSend",
            (data) => {
                notificationStore.addNotification(data.message);
                notificationStore.unreadNotifications++;
            }
        );
    }
}

function handleOutsideClick(event) {
    if (!notificationContainerRef.value?.contains(event.target) && !bellRef.value.contains(event.target)) {
        notificationStore.toggleNotifications();
        document.removeEventListener('click', handleOutsideClick);
    }
}

onMounted(() => {
    initializePusher();
    if (useNotificationStore().notifications.length === 0) {
        notificationStore.getNotifications(1);
    }
    notifications.value = notificationStore.notifications;
});

watch(() => notificationStore.notifications, (newVal) => {
    notifications.value = newVal;
});

onBeforeUnmount(() => {
    if (pusherActive.value) {
        window.Echo.leave(`notifications.${useUserStore().user?.id}`);
    }
    document.removeEventListener('click', handleOutsideClick);
});

</script>