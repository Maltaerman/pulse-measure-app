import { defineAsyncComponent } from 'vue'

import { POPUP_NAME_ENUM } from './types'

const popupRegistry = {
  [POPUP_NAME_ENUM.LANG]: defineAsyncComponent(() => import('./components/LangPopup.vue')),

  [POPUP_NAME_ENUM.INFO]: defineAsyncComponent(() => import('./components/InfoPopup.vue')),

  [POPUP_NAME_ENUM.CONFIRMATION]: defineAsyncComponent(
    () => import('./components/ConfirmationPopup.vue'),
  ),
}

export { popupRegistry }
