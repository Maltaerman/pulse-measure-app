<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue'
import { POPUP_NAME_ENUM } from '@/components/popups/types'

import { usePopupManager } from '@/composables'

const { openPopup } = usePopupManager()
</script>

<template>
  <button
    type="button"
    class="group flex flex-row items-center justify-center z-10 cursor-pointer"
    @click="openPopup({ component: POPUP_NAME_ENUM.MEASURE_INFO })"
  >
    <p
      class="text-text-primary text-md font-medium transition-colors duration-300"
      v-text="$t('main_measure_hiw_title')"
    />

    <BaseIcon name="info" class="size-5 text-text-primary transition-all duration-300" />
  </button>
</template>
