import { useScrollLock } from '@vueuse/core'
import { ref } from 'vue'

export function useBodyScrollLock() {
  const bodyEl = ref<HTMLElement>(document.body)

  const isBodyLocked = useScrollLock(bodyEl)

  function lockScroll() {
    isBodyLocked.value = true
  }

  function unlockScroll() {
    isBodyLocked.value = false
  }

  return {
    isBodyLocked,
    lockScroll,
    unlockScroll,
  }
}
