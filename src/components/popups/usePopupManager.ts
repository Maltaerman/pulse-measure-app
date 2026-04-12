import { type Ref, ref } from 'vue'

import { useBodyScrollLock } from '@/composables/useBodyScrollLock'

const { lockScroll, unlockScroll } = useBodyScrollLock()

interface IPopupState {
  component: string | null
  data?: unknown
}

const popupState: Ref<IPopupState> = ref({
  component: null,
  data: null,
})

export function usePopupManager() {
  function setPopupState(state: IPopupState) {
    popupState.value = state
  }

  function resetPopupState() {
    popupState.value = { component: null, data: null }
  }

  async function openPopup(payload: IPopupState) {
    setPopupState(payload)

    lockScroll()
  }

  function closePopup() {
    resetPopupState()

    unlockScroll()
  }

  return {
    popupState,
    openPopup,
    closePopup,
  }
}
