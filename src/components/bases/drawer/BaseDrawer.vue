<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
import {
  provide,
  ref,
  nextTick,
  useTemplateRef,
  onBeforeUnmount,
  watch,
  computed,
} from 'vue';

import { useDrawer } from './useDrawer';

type DrawerPosition = 'right' | 'left' | 'top' | 'bottom';

export interface IProps {
  position?: DrawerPosition;
  widthClass?: string;
  overlayBgColorClass?: string;
  drawerBgColorClass?: string;
  minHeight?: number;
  maxHeight?: number;
  isOverlay?: boolean;
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    position: 'bottom',
    widthClass: 'w-100',
    overlayBgColorClass: 'bg-neutral-950/50',
    drawerBgColorClass: 'bg-neutral-200',
    minHeight: 500,
    maxHeight: 0,
    isOverlay: true,
  }
);

const contentRef = useTemplateRef('contentRef');

const { isDrawerOpen, closeDrawer } = useDrawer();

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeDrawer();
  }
}

const contentHeight = ref(0);

const isDrawerFullscreen = ref(false);

function updateContentHeight() {
  if(!contentRef.value) return;

  contentHeight.value = contentRef.value.scrollHeight || 0;
}

const debouncedUpdateContentHeight = useDebounceFn(updateContentHeight, 100);

const viewportHeight = ref(window.innerHeight);

function updateViewportHeight() {
  viewportHeight.value = window.innerHeight;
}

const debouncedUpdateViewportHeight = useDebounceFn(updateViewportHeight, 100);

const effectiveMinHeight = computed(
  () => props.minHeight || contentHeight.value
);

const effectiveMaxHeight = computed(() =>
  Math.min(props.maxHeight || viewportHeight.value, viewportHeight.value)
);

const drawerHeight = computed(() => {
  if (isDrawerFullscreen.value) {
    return viewportHeight.value;
  }

  return Math.min(
    viewportHeight.value,
    Math.max(
      effectiveMinHeight.value,
      Math.min(contentHeight.value, effectiveMaxHeight.value)
    )
  );
});

watch(
  isDrawerOpen,
  async () => {
    if (isDrawerOpen.value) {
      await nextTick();

      updateViewportHeight();

      onAddHandlers();
    } else {
      if (contentRef.value) onRemoveHandlers();

      contentHeight.value = 0;
      isDrawerFullscreen.value = false;
    }
  },
  { immediate: true }
);

function onAddHandlers() {
  if (!contentRef.value) return;

  contentRef.value.addEventListener('scroll', debouncedUpdateContentHeight);

  window.addEventListener('resize', debouncedUpdateViewportHeight);

  window.addEventListener('keydown', onKeydown);
}

function onRemoveHandlers() {
  if (!contentRef.value) return;

  contentRef.value.removeEventListener('scroll', debouncedUpdateContentHeight);

  window.removeEventListener('resize', debouncedUpdateViewportHeight);

  window.removeEventListener('keydown', onKeydown);
}

function expandDrawerFullscreen() {
  isDrawerFullscreen.value = true;
}

provide('expandDrawerFullscreen', expandDrawerFullscreen);
provide('isDrawerFullscreen', isDrawerFullscreen);

onBeforeUnmount(() => {
  if (contentRef.value) onRemoveHandlers();
});

watch(drawerHeight, () => {
  if (
    drawerHeight.value === viewportHeight.value &&
    !isDrawerFullscreen.value
  ) {
    isDrawerFullscreen.value = true;
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="transition-fade">
      <div
        v-if="isDrawerOpen && props.isOverlay"
        class="fixed inset-0 z-(--zIndexDrawer)"
        :class="props.overlayBgColorClass"
        @click.self="closeDrawer"
      />
    </Transition>

    <Transition :name="`slide-${props.position}`">
      <div
        v-if="isDrawerOpen"
        class="fixed z-(--zIndexDrawer) flex max-h-[calc(var(--100vh)-12px)]
          flex-col overflow-hidden transition-[height] duration-300 ease-in-out
          will-change-[scroll-position,height,transform]"
        :class="[
          props.drawerBgColorClass,
          {
            'right-0 top-0': props.position === 'right',
            'left-0 top-0': props.position === 'left' || props.position === 'top',
            [`bottom-0 left-0 rounded-t-sm outline
            outline-neutral-700`]: props.position === 'bottom',
          },
          ['top', 'bottom'].includes(props.position)
            ? 'w-screen'
            : props.widthClass,
        ]"
        :style="{
          height: ['top', 'bottom'].includes(props.position)
            ? `${drawerHeight}px`
            : 'var(--100vh)',
        }"
      >
        <div
          ref="contentRef"
          class="--noScrollbar h-full overflow-y-auto"
        >
          <slot />
        </div>

        <button
          aria-label="Close drawer"
          class="absolute right-4 top-4 z-1 text-neutral-800"
          type="button"
          @click="closeDrawer"
        >
          X
        </button>
      </div>
    </Transition>
  </Teleport>
</template>
