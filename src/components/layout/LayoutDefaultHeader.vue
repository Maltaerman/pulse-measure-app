<script setup lang="ts">
import { PAGE_NAME_ENUM } from '@/router'

import BaseIcon from '@/components/bases/BaseIcon.vue'
import { POPUP_NAME_ENUM } from '@/components/popups'

import { useTheme } from '@/composables/useTheme'
import { usePopupManager } from '@/composables/usePopupManager'

const { toggleTheme } = useTheme()
const { openPopup } = usePopupManager()

const LEFT_NAVIGATION = {
  [PAGE_NAME_ENUM.MAIN]: {
    to: { name: PAGE_NAME_ENUM.MEASURE_LIST },
    icon: 'burger-menu',
    iconClasses: '',
  },

  [PAGE_NAME_ENUM.MEASURE_LIST]: {
    to: { name: PAGE_NAME_ENUM.MEASURE_LIST },
    icon: 'burger-menu',
    iconClasses: '',
  },

  [PAGE_NAME_ENUM.MEASURE_ITEM]: {
    to: { name: PAGE_NAME_ENUM.MEASURE_LIST },
    icon: 'arrow',
    iconClasses: 'rotate-90',
  },
}
</script>

<template>
  <header
    class="relative bg-bg/80 backdrop-blur-md border-b border-border flex flex-row justify-between items-center py-2 px-4 transition-colors duration-300"
  >
    <button
      v-if="LEFT_NAVIGATION[$route.name as string]"
      :key="LEFT_NAVIGATION[$route.name as string].icon"
      type="button"
      class="text-text-secondary hover:text-text-primary active:text-text-primary cursor-pointer"
      :class="LEFT_NAVIGATION[$route.name as string].iconClasses"
      @click="$router.push(LEFT_NAVIGATION[$route.name as string].to)"
    >
      <BaseIcon :name="LEFT_NAVIGATION[$route.name as string].icon" class="size-6" />
    </button>

    <h1
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-text-primary transition-colors duration-300 cursor-pointer"
      @click="$router.push({ name: PAGE_NAME_ENUM.MAIN })"
    >
      Heart<span class="text-primary">Rate</span>
    </h1>

    <div class="flex flex-row gap-4 ml-auto">
      <button
        type="button"
        class="text-text-secondary hover:text-text-primary active:text-text-primary cursor-pointer hover:rotate-45 transition-all duration-300"
        @click="openPopup({ component: POPUP_NAME_ENUM.LANG })"
      >
        <BaseIcon name="planet" class="size-6" />
      </button>

      <button
        type="button"
        class="text-text-secondary hover:text-text-primary active:text-text-primary cursor-pointer hover:rotate-45 transition-all duration-300"
        @click="toggleTheme"
      >
        <BaseIcon name="light" class="size-6" />
      </button>
    </div>
  </header>
</template>
