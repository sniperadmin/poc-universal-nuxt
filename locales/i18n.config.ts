import en from './en-US.json'
import ar from './ar-SA.json'

export default defineI18nConfig(() => ({
  legacy: true,
  locale: 'en',
  globalInjection: true,
  detectBrowserLanguage: false,
  allowComposition: true,
  messages: { en, ar }
}))
