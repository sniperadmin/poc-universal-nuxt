export default defineNuxtRouteMiddleware((to) => {
  const { status, data } = useAuth()

  if ((status.value === 'authenticated') && !(data?.value as any)?.email_verified && (to.path !== '/auth/verify-email')) {
    console.log('email is not verified')
    return navigateTo('/auth/verify-email ', { external: true })
  }
})
