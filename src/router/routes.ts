import { LAYOUT_ENUM } from '@/layout/useLayout';

import { PAGE_NAME_ENUM } from '.';

export default [
  {
    path: '/achievementsView',
    name: PAGE_NAME_ENUM.ACHIEVEMENTS,
    meta: { layout: LAYOUT_ENUM.DEFAULT },
    component: () => import('@/views/AchievementsView.vue'),
  },

  {
    path: '/',
    name: PAGE_NAME_ENUM.MAIN,
    meta: { layout: LAYOUT_ENUM.DEFAULT },
    component: () => import('@/views/MainView.vue'),
  },
    
  {
    path: '/measure',
    name: PAGE_NAME_ENUM.MEASURE,
    meta: { layout: LAYOUT_ENUM.DEFAULT },
    component: () => import('@/views/MeasureView.vue'),
  },

  {
    path: '/settings',
    name: PAGE_NAME_ENUM.SETTINGS,
    meta: { layout: LAYOUT_ENUM.DEFAULT },
    component: () => import('@/views/SettingsView.vue'),
  },

  {
    path: '/history',
    name: PAGE_NAME_ENUM.HISTORY,
    meta: { layout: LAYOUT_ENUM.DEFAULT },
    component: () => import('@/views/HistoryView.vue'),
  },

  {
    path: '/history/:id',
    name: PAGE_NAME_ENUM.HISTORY_ITEM,
    meta: { layout: LAYOUT_ENUM.DEFAULT },
    component: () => import('@/views/HistoryItemView.vue'),
    // beforeEnter: async (to) => {
    //   const id = to.params.id
    //   if (!id) return { name: PAGE_NAME_ENUM.NOT_FOUND };
    // },
  },

  {
    path: '/:catchAll(.*)',
    name: PAGE_NAME_ENUM.NOT_FOUND,
    redirect: { name: PAGE_NAME_ENUM.MAIN },
  },
];
