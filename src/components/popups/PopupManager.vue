<script setup lang="ts">
import { usePopupManager } from '@/composables'

import { popupRegistry } from './popupRegistry'

const { popupState } = usePopupManager()
</script>

<template>
  <div v-if="popupState.component" class="fixed inset-0 sm:bg-secondary/40 sm:backdrop-blur-sm">
    <slot name="overlay">
      <div aria-hidden="true" />
    </slot>

    <div class="flex h-dvh overflow-y-auto overscroll-contain sm:py-6 md:py-10">
      <dialog
        :id="popupState.component"
        class="relative w-full min-h-full m-auto flex bg-bg-card sm:w-100 sm:min-h-0 sm:shadow-lg sm:border sm:border-border sm:rounded-lg"
      >
        <component
          :is="popupRegistry[popupState.component]"
          class="fle w-full flex-col gap-4"
          :data="popupState.data"
        />
      </dialog>
    </div>
  </div>
</template>
