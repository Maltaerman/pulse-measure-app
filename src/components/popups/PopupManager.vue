<script setup lang="ts">
import { usePopupManager } from './usePopupManager'
import { popupRegistry } from './popupRegistry'

const { popupState } = usePopupManager()
</script>

<template>
  <div v-if="popupState.component" class="fixed inset-0 bg-secondary/40 backdrop-blur-sm">
    <slot name="overlay">
      <div aria-hidden="true" />
    </slot>

    <div class="flex h-dvh overflow-y-auto overscroll-contain sm:py-6 md:py-10">
      <dialog
        :id="popupState.component"
        class="w-full sm:w-100 min-h-full sm:min-h-0 relative m-auto flex bg-bg-card shadow-lg border border-border sm:rounded-2xl"
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
