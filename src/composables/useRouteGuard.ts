import { useRouter } from 'vue-router';
import { useDevice } from '@/composables/useDevice';

import { PAGE_NAME_ENUM } from '@/router';

export function useRouteGuard() {
  const router = useRouter();
  const { isDesktop } = useDevice();

  router.beforeEach((to) => {
    const isWarning = isDesktop.value && to.name !== PAGE_NAME_ENUM.WARNING;

    if (isWarning) return { name: PAGE_NAME_ENUM.WARNING }
  })
}