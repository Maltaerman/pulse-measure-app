import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

import { LAYOUT_ENUM } from '@/router'

import DefaultLayout from './DefaultLayout.vue'

export function useLayout() {
  const route = useRoute();

  const layoutComponent = computed(() => {
    switch (route.meta.layout) {
      case LAYOUT_ENUM.DEFAULT:
        return DefaultLayout;

      case LAYOUT_ENUM.EMPTY:
        return defineAsyncComponent(() => import('./EmptyLayout.vue'));

      default:
        return DefaultLayout;
    }
  });

  return { layoutComponent }
}
