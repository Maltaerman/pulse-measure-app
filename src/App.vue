<script setup lang="ts">
import { useLayout } from '@/layouts/useLayout'
import { useEventListener } from '@vueuse/core'

import { useTheme, usePopupManager, useUser } from '@/composables'

import { POPUP_NAME_ENUM } from '@/components/popups'

const FEATURES_INFO_POPUP_DELAY = 1000

const { layoutComponent } = useLayout()
const { initTheme } = useTheme()
const { openPopup, popupKeydownEventListener } = usePopupManager()
const { setUser } = useUser()

initTheme()
setUser()

useEventListener('keydown', popupKeydownEventListener)

setTimeout(() => openPopup({ component: POPUP_NAME_ENUM.FEATURES_INFO }), FEATURES_INFO_POPUP_DELAY)
</script>

<template>
  <component :is="layoutComponent">
    <router-view v-slot="{ Component, route }">
      <Transition name="transition-fade" mode="out-in">
        <component :is="Component" :key="route.name" />
      </Transition>
    </router-view>
  </component>
</template>
