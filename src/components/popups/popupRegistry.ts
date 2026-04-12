import { defineAsyncComponent } from 'vue'

import { POPUP_NAME_ENUM } from './types'

const popupRegistry = {
  [POPUP_NAME_ENUM.LANG]: defineAsyncComponent(() => import('./components/LangPopup.vue')),
}

export { popupRegistry }
