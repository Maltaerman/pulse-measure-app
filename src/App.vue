<script setup lang="ts">
import { useLayout } from '@/layouts/useLayout'
import { useEventListener } from '@vueuse/core'
import { usePopupManager, useUser } from '@/composables'

const { layoutComponent } = useLayout()
const { popupKeydownEventListener } = usePopupManager()
const { setUser } = useUser()

useEventListener('keydown', popupKeydownEventListener)

setUser()
</script>

<template>
  <component :is="layoutComponent">
    <router-view :key="$route.fullPath" v-slot="{ Component, route }">
      <Transition name="transition-fade" mode="out-in">
        <component :is="Component" :key="route.name" />
      </Transition>
    </router-view>
  </component>
</template>
