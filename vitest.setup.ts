// import { beforeAll, afterAll, vi } from 'vitest'
// import { ref } from 'vue'
import { config } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import en from '@/locales/en-US.json'
import ar from '@/locales/ar-SA.json'

// beforeAll(() => {
//   vi.mock('vue-i18n', async (importOriginal) => {
//     const module = await importOriginal<typeof import('vue-i18n')>()
//
//     return {
//       ...module,
//       useI18n: () => ({
//         locale: ref('en'),
//         locales: ref([en, ar]),
//         t: (key: string, {}: { [key: string]: (k: string) => string }) => key
//       }),
//     }
//   })
// })
//
// afterAll(() => {
//   vi.restoreAllMocks()
// })

// setup i18n
const i18n = createI18n({
  // ...options,
  fallbackLocale: 'en',
  locale: 'en',
  legacy: false,
  globalInjection: false,
  allowComposition: true,
  messages: { en, ar }
})

config.global.plugins.push(i18n)
