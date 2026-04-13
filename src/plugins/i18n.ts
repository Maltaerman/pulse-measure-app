import { createI18n } from 'vue-i18n'
import translations from '../translations.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: translations,
})
