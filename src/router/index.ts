import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'

export * from './enums'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const DEFAULT_LOCALE = 'en'

import { de, enCA, it, ja, fr } from 'date-fns/locale'

export const DATE_FNS_LOCALES_LIST = { en: enCA, de, 'en-ca': enCA, it, ja, fr }

export const LOCALES_LIST = ['en', 'de', 'en-ca', 'it', 'ja', 'fr']

import { PAGE_NAME_ENUM } from '@/router'

import { i18n } from '@/plugins/i18n'

router.beforeEach((to, from) => {
  const locale = to.params.locale as string | undefined

  const isValidLocale = locale && LOCALES_LIST.includes(locale)

  if (!isValidLocale) {
    return {
      name: to.name ?? PAGE_NAME_ENUM.MAIN,
      params: {
        ...to.params,
        locale: from.params.locale || DEFAULT_LOCALE,
      },
      query: to.query,
      hash: to.hash,
      replace: true,
    }
  }

  i18n.global.locale.value = locale as 'en' | 'de' | 'en-ca' | 'it' | 'ja' | 'fr'
})

export default router
