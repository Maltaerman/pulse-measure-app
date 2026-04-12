import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'

export * from './enums'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

const DEFAULT_LOCALE = 'en'

export const LOCALES_LIST = [
  { code: 'en', flag: 'colored-flag-en' },
  { code: 'de', flag: 'colored-flag-de' },
]

import { PAGE_NAME_ENUM } from '@/router'

router.beforeEach((to) => {
  const locale = to.params.locale as string | undefined

  const isValidLocale = locale && LOCALES_LIST.map(({ code }) => code).includes(locale)

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
