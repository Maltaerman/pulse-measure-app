import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes';

export const PAGE_NAME_ENUM = {
  ACHIEVEMENTS: 'Achievements',
  MAIN: 'Main',
  MEASURE: 'Measure',
  SETTINGS: 'Settings',
  HISTORY: 'History',
  HISTORY_ITEM: 'HistoryItem',
  NOT_FOUND: 'NotFound',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
