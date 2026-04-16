import { useScrollLock } from '@vueuse/core'
import { ref } from 'vue'

export function useBodyScrollLock() {
  const bodyEl = ref<HTMLElement>(document.body)
  const html = document.documentElement

  const isBodyLocked = useScrollLock(bodyEl)

  function lockScroll() {
    isBodyLocked.value = true

    if (!html.classList.contains('scrollbarGutterStableJs')) {
      html.classList.add('scrollbarGutterStableJs')
    }
  }

  function unlockScroll() {
    isBodyLocked.value = false

    if (html.classList.contains('scrollbarGutterStableJs')) {
      html.classList.remove('scrollbarGutterStableJs')
    }
  }

  return {
    isBodyLocked,
    lockScroll,
    unlockScroll,
  }
}
