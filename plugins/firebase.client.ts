import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin((nuxtApp) => {
  // Initialize firebase client
  const config = useRuntimeConfig()
  const { firebase } = config.public
  const app = initializeApp(firebase)
  const auth = getAuth(app)

  // Inject firebase modules into runtime
  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth
    }
  }
})
