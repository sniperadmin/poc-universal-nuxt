// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,

  devtools: { enabled: true },

  runtimeConfig: {
    strapiToken: import.meta.env.STRAPI_STAGING_TOKEN,
    serverBaseUrl: import.meta.env.STRAPI_BASE_URL,
    firebaseIdentityEndpoint: import.meta.env.FIREBASE_IDENTITY_ENDPOINT,
    firebaseTokenVerifyURL: import.meta.env.FIREBASE_TOKEN_VER,
    public: {
      usingSSR: import.meta.env.USING_SSR,
      firebase: {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
      }
    }
  },

  modules: ['@pinia/nuxt', "@sidebase/nuxt-auth"],

  auth: {
    baseURL: '/api/auth',
    provider: {
      type: 'local',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/session', method: 'get' }
      },
      pages: {
        login: '/auth/signin'
      },
      token: {
        signInResponseTokenPointer: undefined
      }
    },
    session: {
      // Whether to refresh the session every time the browser window is refocused.
      enableRefreshOnWindowFocus: true,

      // Whether to refresh the session every `X` milliseconds. Set this to `false` to turn it off. The session will only be refreshed if a session already exists.
      enableRefreshPeriodically: false
    },
    globalAppMiddleware: {
      isEnabled: true
    }
  }
})
