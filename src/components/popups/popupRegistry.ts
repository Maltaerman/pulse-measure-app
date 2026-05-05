import { defineAsyncComponent, type Component } from 'vue'

import PopupPreloader from './components/PopupPreLoader.vue'

import { POPUP_NAME_ENUM } from './types'

const popupRegistry = {
  [POPUP_NAME_ENUM.LANG]: defineAsyncComponent({
    loader: () => import('./components/LangPopup.vue') as Promise<Component>,
    loadingComponent: PopupPreloader,
  }),

  [POPUP_NAME_ENUM.INFO]: defineAsyncComponent({
    loader: () => import('./components/InfoPopup.vue') as Promise<Component>,
    loadingComponent: PopupPreloader,
  }),

  [POPUP_NAME_ENUM.CONFIRMATION]: defineAsyncComponent({
    loader: () => import('./components/ConfirmationPopup.vue') as Promise<Component>,
    loadingComponent: PopupPreloader,
  }),
}

export { popupRegistry }
