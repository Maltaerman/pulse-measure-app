<script setup lang="ts">
import { shallowRef } from 'vue'

export interface IProps {
  name: string
}

const props = withDefaults(defineProps<IProps>(), {})

const svgModules = import.meta.glob('/src/assets/icons/*.svg', {
  eager: true,
  import: 'default',
})

const iconComponent = shallowRef(null)

function loadIcon() {
  const svgPath = `/src/assets/icons/${props.name}.svg`
  const svgIcon = svgModules[svgPath]

  if (!svgIcon) throw new Error('Svg Icon with this name does not exist')

  iconComponent.value = svgIcon
}

loadIcon()
</script>

<template>
  <component :is="iconComponent" v-if="iconComponent" class="duration-300" />
</template>
