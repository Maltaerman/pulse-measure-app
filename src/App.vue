<script setup lang="ts">
import { useLayout } from '@/layout/useLayout'
import { useEventListener } from '@vueuse/core'
// import { useLayoutRouteTransition } from '@/layout/useLayoutRouteTransition';
import { usePopupManager, useUser } from '@/composables'

const { layoutComponent } = useLayout()
const { popupKeydownEventListener } = usePopupManager()
const { setUser } = useUser()
// const { layoutRouteTransition } = useLayoutRouteTransition();

useEventListener('keydown', popupKeydownEventListener)

setUser()
</script>

<template>
  <component :is="layoutComponent">
    <!-- <Transition
      :name="layoutRouteTransition"
      mode="out-in"
    > -->
    <router-view :key="$route.fullPath" v-slot="{ Component, route }">
      <component :is="Component" :key="route.name" />
    </router-view>
    <!-- </Transition> -->
  </component>
</template>
