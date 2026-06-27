<script setup lang="ts">
import { useLayout } from '@/layouts/useLayout'
import { useEventListener } from '@vueuse/core'
import { useTheme, usePopupManager, useUser } from '@/composables'

const { layoutComponent } = useLayout()
const { initTheme } = useTheme()
const { popupKeydownEventListener } = usePopupManager()
const { setUser } = useUser()

useEventListener('keydown', popupKeydownEventListener)

initTheme()
setUser()
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
