import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useLayoutRouteTransition() {
  const route = useRoute()

  const layoutRouteTransition = ref('slide-left')

  let lastPath = route.fullPath

  watch(route, ({ fullPath }) => {
    layoutRouteTransition.value =
      fullPath.length > lastPath.length ? 'transition-slide-left' : 'transition-slide-right'

    lastPath = fullPath
  })

  return { layoutRouteTransition }
}
