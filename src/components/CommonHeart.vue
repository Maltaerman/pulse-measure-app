<script setup lang="ts">
import { computed } from 'vue'

export interface IProps {
  size?: number
  colorClass?: string
}

const props = withDefaults(defineProps<IProps>(), {
  size: 30,
  colorClass: 'bg-primary',
})

const heartStyle = computed(() => ({
  width: props.size + 'px',
  height: props.size + 'px',
}))

const heartBeforeStyle = computed(() => ({
  width: props.size + 'px',
  height: props.size + 'px',
  top: `-${props.size / 2}px`,
  left: '0px',
}))

const heartAfterStyle = computed(() => ({
  width: props.size + 'px',
  height: props.size + 'px',
  left: `${props.size / 2}px`,
  top: '0px',
}))
</script>

<template>
  <div class="-rotate-45" :class="props.colorClass" :style="heartStyle">
    <div class="absolute rounded-full" :class="props.colorClass" :style="heartBeforeStyle" />

    <div class="absolute rounded-full" :class="props.colorClass" :style="heartAfterStyle" />
  </div>
</template>
