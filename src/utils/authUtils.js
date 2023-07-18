import { verifyEmail, authGoogle } from '@/services/auth.js'
import { useModalStore } from '@/store/useModalStore.js'
import { useUserStore } from '@/store/useUserStore.js'
import { useAuthStore } from '@/store/useAuthStore.js'

export async function handleEmailVerification(to, from, next) {
  const veryfyLink = to.fullPath.split('?email=')[0]
  const email = to.fullPath.split('?email=')[1]
  try {
    await verifyEmail(veryfyLink).then((res) => {
      if (res.data.email) {
        useUserStore().user.email = res.data.email
      }
    })
    if (useAuthStore().isAuthenticated) {
      next({ name: 'news-feed' })
    } else useModalStore().toggleEmailVerifiedModal()
  } catch (error) {
    useUserStore().setEmail(email)
    useModalStore().toggleEmailVerificationResendModal()
  }
  next({ name: 'home' })
}

export async function handlePasswordResset(to, from, next) {
  const regex = /reset-password\/(?<token>[^?]+)\?email=(?<email>[^&]+)/
  const match = to.fullPath.match(regex)

  const token = match?.groups?.token || null
  const email = match?.groups?.email || null

  useUserStore().setEmail(email)
  useUserStore().setToken(token)

  useModalStore().toggleResetPasswordModal()

  next({ name: 'home' })
}

export async function handleGoogleAuth(to, _, next) {
  try {
    await authGoogle(to.fullPath)
    useAuthStore().setIsAuthenticated(true)
    next({ name: 'news-feed' })
  } catch (error) {
    next({ name: 'forbidden' })
  }
}

export async function checkAuth(_, __, next) {
  if (!useAuthStore().isAuthenticated) {
    await useAuthStore()
      .checkAuth()
      .then(() => {
        if (useAuthStore().isAuthenticated) {
          next()
        } else {
          next({ name: 'forbidden' })
        }
      })
  } else {
    next()
  }
}
