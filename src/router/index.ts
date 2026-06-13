import { createRouter, createWebHistory } from 'vue-router'
import { PAGE_NAME_ENUM } from '@/router'
import { i18n } from '@/plugins/i18n'

import { LOCALES_LIST, type Locale } from '@/composables'

import routes from './routes'

export * from './types'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const DEFAULT_LOCALE = 'en'

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

  i18n.global.locale.value = locale as Locale
})

export default router
