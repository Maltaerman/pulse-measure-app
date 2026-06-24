<script setup lang="ts">
import { PAGE_NAME_ENUM } from '@/router'

import BaseIcon from '@/components/base/BaseIcon.vue'
import { POPUP_NAME_ENUM } from '@/components/popups'

import { useTheme } from '@/composables'
import { usePopupManager } from '@/composables'

const { toggleTheme } = useTheme()
const { openPopup } = usePopupManager()

const NAV_LIST = {
  [PAGE_NAME_ENUM.MAIN]: {
    to: { name: PAGE_NAME_ENUM.MEASURE_LIST },
    icon: 'burger-menu',
  },

  [PAGE_NAME_ENUM.MEASURE_LIST]: {
    to: { name: PAGE_NAME_ENUM.MAIN },
    icon: 'heart',
  },

  [PAGE_NAME_ENUM.MEASURE_ITEM]: {
    to: { name: PAGE_NAME_ENUM.MEASURE_LIST },
    icon: 'burger-menu',
  },
}

const ACTION_LIST = [
  {
    callback: () => openPopup({ component: POPUP_NAME_ENUM.LANG }),
    icon: 'planet',
    iconClasses: 'hover:rotate-45',
  },

  {
    callback: () => openPopup({ component: POPUP_NAME_ENUM.PWA }),
    icon: 'pwa',
    iconClasses: 'hover:scale-130',
  },

  {
    callback: toggleTheme,
    icon: 'light',
    iconClasses: 'hover:rotate-45',
  },
]
</script>

<template>
  <header
    class="relative bg-bg/80 backdrop-blur-md border-b border-border flex flex-row justify-between items-center py-2 px-4 transition-colors duration-300"
  >
    <Transition name="transition-fade" mode="out-in">
      <button
        v-if="NAV_LIST[$route.name as string]"
        :key="NAV_LIST[$route.name as string].icon"
        type="button"
        class="text-text-secondary hover:text-text-primary active:text-text-primary cursor-pointer"
        @click="$router.push(NAV_LIST[$route.name as string].to)"
      >
        <BaseIcon :name="NAV_LIST[$route.name as string].icon" class="size-6" />
      </button>
    </Transition>

    <h1
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-text-primary transition-colors duration-300 cursor-pointer"
      @click="$router.push({ name: PAGE_NAME_ENUM.MAIN })"
    >
      Heart<span class="text-primary">Rate</span>
    </h1>

    <div class="flex flex-row gap-4 ml-auto">
      <button
        v-for="{ icon, iconClasses, callback } in ACTION_LIST"
        :key="icon"
        type="button"
        class="text-text-secondary hover:text-text-primary active:text-text-primary cursor-pointer transition-all duration-300"
        :class="iconClasses"
        @click="callback"
      >
        <BaseIcon :name="icon" class="size-6" />
      </button>
    </div>
  </header>
</template>
