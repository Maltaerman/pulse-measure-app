<script setup lang="ts">
import { useLayout } from '@/layout/useLayout'
// import { useLayoutRouteTransition } from '@/layout/useLayoutRouteTransition';
import { useUser } from '@/composables'

const { layoutComponent } = useLayout()
const { setUser } = useUser()
// const { layoutRouteTransition } = useLayoutRouteTransition();

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
