import {defineNuxtRouteMiddleware} from '#app'

export default defineNuxtRouteMiddleware((to) => {
  const { status, data } = useAuth()

  const app = useNuxtApp()

  app.hooks.hook('app:mounted', () => {
    // if ((status.value === 'authenticated') && !(data?.value as any)?.email_verified && (to.path !== '/auth/verify-email')) {
    //   console.log('email is not verified')
    //   navigateTo('/auth/verify-email ')
    // }
  })
  return
})
