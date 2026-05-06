import { defineAsyncComponent, type Component } from 'vue'

import PopupPreloader from './components/PopupPreLoader.vue'

import { POPUP_NAME_ENUM } from './types'

const popupRegistry = {
  [POPUP_NAME_ENUM.LANG]: defineAsyncComponent({
    loader: () => import('./components/LangPopup.vue') as Promise<Component>,
    loadingComponent: PopupPreloader,
  }),

  [POPUP_NAME_ENUM.FEATURES_INFO]: defineAsyncComponent({
    loader: () => import('./components/FeaturesInfoPopup.vue') as Promise<Component>,
    loadingComponent: PopupPreloader,
  }),

  [POPUP_NAME_ENUM.MEASURE_INFO]: defineAsyncComponent({
    loader: () => import('./components/MeasureInfoPopup.vue') as Promise<Component>,
    loadingComponent: PopupPreloader,
  }),

  [POPUP_NAME_ENUM.CONFIRMATION]: defineAsyncComponent({
    loader: () => import('./components/ConfirmationPopup.vue') as Promise<Component>,
    loadingComponent: PopupPreloader,
  }),
}

export { popupRegistry }
