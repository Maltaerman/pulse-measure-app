import { PAGE_NAME_ENUM, LAYOUT_ENUM } from './enums'

export default [
  {
    path: '/:locale?/',
    name: PAGE_NAME_ENUM.MAIN,
    meta: { layout: LAYOUT_ENUM.DEFAULT },
    component: () => import('@/views/MainView.vue'),
  },

  {
    path: '/:locale?/measure-list',
    name: PAGE_NAME_ENUM.MEASURE_LIST,
    meta: { layout: LAYOUT_ENUM.DEFAULT },
    component: () => import('@/views/MeasureListView.vue'),
  },

  {
    path: '/:locale?/measure-detail/:id',
    name: PAGE_NAME_ENUM.MEASURE_ITEM,
    meta: { layout: LAYOUT_ENUM.DEFAULT },
    component: () => import('@/views/MeasureDetailView.vue'),
  },

  // TODO: add this in the next iteration
  // {
  //   path: '/:locale?/settings',
  //   name: PAGE_NAME_ENUM.SETTINGS,
  //   meta: { layout: LAYOUT_ENUM.DEFAULT },
  //   component: () => import('@/views/SettingsView.vue'),
  // },

  // TODO: add this in the next iteration
  // {
  //   path: '/:locale?/achievements',
  //   name: PAGE_NAME_ENUM.ACHIEVEMENTS,
  //   meta: { layout: LAYOUT_ENUM.DEFAULT },
  //   component: () => import('@/views/AchievementsView.vue'),
  // },

  {
    path: '/:locale?/:catchAll(.*)',
    name: PAGE_NAME_ENUM.NOT_FOUND,
    redirect: { name: PAGE_NAME_ENUM.MAIN },
  },
]
