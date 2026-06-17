import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { i18n } from '@/plugins/i18n'
import { de, enCA, it, ja, fr } from 'date-fns/locale'

export type Locale = 'en' | 'de' | 'en-ca' | 'it' | 'ja' | 'fr';

export const DEFAULT_LOCALE = 'en'
export const DATE_FNS_LOCALES_LIST = { en: enCA, de, 'en-ca': enCA, it, ja, fr }
export const LOCALES_LIST = ['en', 'de', 'en-ca', 'it', 'ja', 'fr']

export function useLocale() {
  const router = useRouter()
  const route = useRoute()

  const selectedLocale = ref(route.params.locale as Locale)

  function changeLocale() {
    i18n.global.locale.value = selectedLocale.value;

    router.push({
      params: { locale: selectedLocale.value }, 
      query: route.query,
    })
  }

  return {
    selectedLocale,
    changeLocale,
  }
}
