import { toast as vue3Toastify, type ToastType } from 'vue3-toastify'

const TOAST_DELAY = 3000

export function useToast() {
  function toast(type: ToastType, message: string) {
    vue3Toastify(message, { type, autoClose: TOAST_DELAY })
  }

  return { toast }
}
