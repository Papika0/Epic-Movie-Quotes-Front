<template>
  <div class="relative my-auto cursor-pointer" @click="openModal">
    <IconNotificationBell class="my-auto w-6 h-6 lg:w-min lg:h-min" />
    <div class="absolute top-0 right-0 mt-1 mr-1">
      <div class="relative flex items-center justify-center">
        <IconNotificationEclipse class="absolute w-4 h-4 lg:w-min lg:h-min" />
        <p class="absolute text-white text-xs lg:text-base">{{ notificationsCount }}</p>
      </div>
    </div>
  </div>

  <div
    v-if="notificationStore.showNotifications"
    class="absolute lg:w-961px w-full lg:h-812px h-3/4 bg-black rounded-xl z-50 lg:mt-70px mt-55px lg:mr-16 right-0"
    ref="notificationContainerRef"
  >
    <IconBlackPolygon class="absolute lg:mr-195px mr-7 right-0 -mt-5 -z-20" />

    <div
      class="pt-10 pb-14 px-8 flex flex-col lg:max-h-812px max-h-full lg:gap-4 gap-2 overflow-y-scroll"
      @scroll="scrolling"
    >
      <div class="inline-flex justify-between my-auto mb-2">
        <p class="text-white lg:text-3xl my-auto text-xl font-medium capitalize leading-10">
          {{ $t('feed.notifications') }}
        </p>
        <p
          class="text-white lg:text-xl my-auto text-sm font-normal underline leading-loose cursor-pointer"
          @click="notificationStore.markAllAsRead()"
        >
          {{ $t('feed.mark_all_as_read') }}
        </p>
      </div>

      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="w-full h-117px border relative border-gray-500 border-opacity-50 bg-black lg:px-6 px-3 lg:py-5 py-2 flex flex-row lg:gap-6 gap-3 cursor-pointer"
        @click="goToQuote(notification.id, notification.quote_id)"
      >
        <div class="flex flex-col w-20 lg:block lg:w-24">
          <img
            :src="userThumbnail(notification.from.thumbnail)"
            alt="thumbnail"
            class="lg:w-20 lg:h-20 w-60 h-60 rounded-full lg:my-auto"
            :class="{ 'border-2 border-green-700': notification.read == false }"
          />
          <p
            v-show="notification.read == false"
            class="text-green-700 font-normal my-auto mx-auto lg:hidden"
          >
            {{ $t('feed.new') }}
          </p>
        </div>
        <div class="flex lg:flex-row flex-col lg:justify-between my-auto w-full">
          <div class="flex flex-col gap-1">
            <p class="text-white text-xl font-normal lg:leading-loose">
              {{ notification.from.username }}
            </p>

            <div class="inline-flex gap-3">
              <IconQuoteSymbol
                class="my-auto lg:w-6 lg:h-6 w-4 h-4"
                v-if="notification.type == 'comment'"
              />
              <IconHeartFilled class="my-auto lg:w-6 lg:h-6 w-4 h-4" v-else />
              <p
                class="text-gray-300 lg:text-xl font-normal lg:leading-loose w-full h-6 lg:h-min overflow-hidden"
                v-if="notification.type == 'comment'"
              >
                {{ $t('feed.commented_to_your_movie_quote') }}
              </p>
              <p
                class="text-gray-300 lg:text-xl font-normal lg:leading-loose w-full h-6 lg:h-min overflow-auto"
                v-else
              >
                {{ $t('feed.reacted_to_your_quote') }}
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-gray-300 lg:text-xl font-normal leading-loose">
              {{ notification.created }}
            </p>
            <p
              v-show="notification.read == false"
              class="text-green-700 text-xl font-normal hidden lg:block leading-loose text-right"
            >
              {{ $t('feed.new') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconNotificationBell from '@/components/icons/header/IconNotificationBell.vue'
import IconNotificationEclipse from '@/components/icons/header/IconNotificationEclipse.vue'
import IconBlackPolygon from '@/components/icons/header/IconBlackPolygon.vue'
import IconQuoteSymbol from '@/components/icons/movie/IconQuoteSymbol.vue'
import IconHeartFilled from '@/components/icons/header/IconHeartFilled.vue'
import { useUserStore } from '@/store/useUserStore'
import router from '@/router/index.js'
import instantiatePusher from '@/helpers/instantiatePusher.js'
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { markAsRead } from '@/services/notifications.js'
import { onClickOutside } from '@vueuse/core'
import { useNotificationStore } from '@/store/useNotificationStore'

const notificationStore = useNotificationStore()
const pusherActive = ref(false)
const notificationContainerRef = ref(null)

const page = ref(2)

const notifications = ref([])

const notificationsCount = computed(() => {
  return notificationStore.unreadNotifications
})

onClickOutside(notificationContainerRef, () => (notificationStore.showNotifications = false))

const openModal = () => {
  notificationStore.toggleNotifications()
}

function goToQuote(id, quoteId) {
  if (
    notificationStore.notifications.find((notification) => notification.id === id).read == false
  ) {
    notificationStore.unreadNotifications--
    markAsRead(id).then((data) => {
      notificationStore.notifications.find((notification) => {
        return notification.id === data.notification.id
      }).read = data.notification.read
    })
  }
  router.push({ name: 'quote-details', params: { id: quoteId, type: 'view' } })
}

const userThumbnail = (thumbnail) => import.meta.env.VITE_API_AUTH_URL + thumbnail

const scrolling = (e) => {
  const clientHeight = e.target.clientHeight
  const scrollHeight = e.target.scrollHeight
  const scrollTop = e.target.scrollTop

  if (scrollTop + clientHeight >= scrollHeight) {
    notificationStore.getNotifications(page.value)
    page.value++
  }
}

function initializePusher() {
  pusherActive.value = instantiatePusher()
  if (pusherActive.value) {
    window.Echo.private(`notifications.${useUserStore().user.id}`).listen(
      'NotificationSend',
      (data) => {
        notificationStore.addNotification(data.message)
        notificationStore.unreadNotifications++
      }
    )
  }
}

onMounted(() => {
  initializePusher()
  if (useNotificationStore().notifications.length === 0) {
    notificationStore.getNotifications(1)
  }
  notifications.value = notificationStore.notifications
})

watch(
  () => notificationStore.notifications,
  (newVal) => {
    notifications.value = newVal
  }
)

onBeforeUnmount(() => {
  if (pusherActive.value) {
    window.Echo.leave(`notifications.${useUserStore().user?.id}`)
  }
  notificationStore.showNotifications = false
})
</script>
