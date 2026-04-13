import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { i18n } from '@/plugins/i18n'

export function useLocale() {
  const router = useRouter()
  const route = useRoute()

  const selectedLocale = ref<'en' | 'de' | 'en-ca' | 'it' | 'ja' | 'fr'>(
    route.params.locale as 'en' | 'de' | 'en-ca' | 'it' | 'ja' | 'fr',
  )

  function changeLocale() {
    i18n.global.locale.value = selectedLocale.value as string

    router.push({ params: { locale: selectedLocale.value }, query: route.query })
  }

  return {
    selectedLocale,
    changeLocale,
  }
}
