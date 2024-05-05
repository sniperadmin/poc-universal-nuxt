import { fileURLToPath, URL } from 'url'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
      '~': fileURLToPath(new URL('./', import.meta.url)),
      // '#components': fileURLToPath(new URL('./.nuxt/components', import.meta.url))
    }
  },
  test: {
    environment: 'nuxt',
    poolOptions: {
      threads: {
        maxThreads: 5,
        minThreads: 1
      }
    },
    // you can optionally set Nuxt-specific environment options
    // environmentOptions: {
    //   nuxt: {
    //     rootDir: fileURLToPath(new URL('./playground', import.meta.url)),
    //     domEnvironment: 'happy-dom', // 'happy-dom' (default) or 'jsdom'
    //     overrides: {
    //       // other Nuxt config you want to pass
    //     }
    //   }
    // }
    globals: true,
    css: true,
    silent: true,
    coverage: {
      enabled: true,
      provider: 'istanbul',
      reporter: ['text', 'json', 'html']
    },
    server: {
      deps: {
        inline: ['vuetify']
      }
    },
    setupFiles: [
      './vitest.setup.ts',
      '@vitest/web-worker'
    ]
  }
})
