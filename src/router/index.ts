import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'

export * from './enums'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const DEFAULT_LOCALE = 'en'

export const LOCALES_LIST = ['en', 'de', 'en-ca', 'it', 'ja', 'fr']

import { PAGE_NAME_ENUM } from '@/router'

router.beforeEach((to) => {
  const locale = to.params.locale as string | undefined

  const isValidLocale = locale && LOCALES_LIST.includes(locale)

  if (!isValidLocale) {
    return {
      name: to.name ?? PAGE_NAME_ENUM.MAIN,
      params: {
        ...to.params,
        locale: DEFAULT_LOCALE,
      },
      query: to.query,
      hash: to.hash,
      replace: true,
    }
  }
})

export default router
