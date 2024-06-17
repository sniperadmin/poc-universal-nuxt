import en from './en-US.json'
import ar from './ar-SA.json'
import { ar as vuetifyAr, en as vuetifyEn } from "vuetify/locale"

export default defineI18nConfig(() => ({
  legacy: true,
  locale: 'en',
  globalInjection: true,
  detectBrowserLanguage: false,
  allowComposition: true,
  messages: {
    en: {
      ...en,
      $vuetify: vuetifyEn
    },
    ar: {
      ...ar,
      $vuetify: vuetifyAr
    }
  }
}))
