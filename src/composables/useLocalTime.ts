import { format } from 'date-fns'
import { ref, onMounted, onUnmounted } from 'vue'

export function useLocalTime() {
  const localTime = ref(format(new Date(), 'HH:mm'))

  let interval: ReturnType<typeof setInterval>

  onMounted(() => {
    interval = setInterval(() => {
      localTime.value = format(new Date(), 'HH:mm')
    }, 1000)
  })

  onUnmounted(() => clearInterval(interval))

  return { localTime }
}
