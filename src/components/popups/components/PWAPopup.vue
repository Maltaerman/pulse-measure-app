<script setup lang="ts">
import { usePopupManager } from '@/composables'

import { BaseIcon } from '@/components/base'

const { closePopup } = usePopupManager()

const BROWSERS = ['Safari', 'Chrome']

const STEPS = ['popup_pwa_step-1', 'popup_pwa_step-2', 'popup_pwa_step-3']
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-row items-center justify-between">
      <h2 class="text-lg font-semibold text-text-primary" v-text="$t('popup_pwa_title')" />

      <button type="button" class="cursor-pointer" @click="closePopup">
        <BaseIcon
          name="close"
          class="size-4 text-text-muted hover:text-text-primary transition-all duration-300"
        />
      </button>
    </div>

    <div class="flex justify-center gap-2">
      <div
        v-for="browser in BROWSERS"
        :key="browser"
        class="flex items-center gap-1.5 bg-bg-muted rounded-full px-4 py-3"
      >
        <BaseIcon name="browser" class="size-4 text-text-muted" />

        <span class="text-sm font-semibold text-text-secondary" v-text="browser" />
      </div>
    </div>

    <ul class="flex flex-col gap-4">
      <li
        v-for="(step, index) in STEPS"
        :key="step"
        class="flex items-center gap-2.5 bg-bg-muted rounded-xl px-4 py-3"
      >
        <p
          class="size-6 rounded-full bg-primary-active flex items-center justify-center text-sm font-bold text-primary"
          v-text="index"
        />

        <p class="text-xs font-medium text-text-primary" v-text="$t(step)" />
      </li>
    </ul>
  </div>
</template>
