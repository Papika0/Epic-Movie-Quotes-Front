import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import axios from 'axios'
import router from '@/router/index.js'

export default function instantiatePusher() {
  window.Pusher = Pusher

  window.Echo = new Echo({
    authEndpoint: `${import.meta.env.VITE_API_AUTH_URL}/broadcasting/auth`,
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    forceTLS: true,
    cluster: ['eu'],
    encrypted: true,
    authorizer: (channel) => {
      return {
        authorize: (socketId, callback) => {
          axios
            .post(
              `${import.meta.env.VITE_API_AUTH_URL}/broadcasting/auth`,
              {
                socket_id: socketId,
                channel_name: channel.name
              },
              { withCredentials: true }
            )
            .then((response) => {
              callback(null, response.data)
            })
            .catch((error) => {
              router.push({ name: 'forbidden' })
              callback(error)
            })
        }
      }
    }
  })

  return true
}
