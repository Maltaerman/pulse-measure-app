<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue'

export interface IProps {
  title: string
  subtitle: string
  img: string
}

const props = withDefaults(defineProps<IProps>(), {})
</script>

<template>
  <div class="flex flex-col items-center p-4 gap-4">
    <BaseIcon :name="props.img" class="size-70 m-auto" draggable="false" />

    <div class="flex flex-col items-center gap-3 text-center">
      <p class="text-primary text-xs transition-colors duration-300" v-text="$t(props.subtitle)" />

      <p
        class="text-text-primary text-sm font-bold transition-colors duration-300"
        v-text="$t(props.title)"
      />
    </div>
  </div>
</template>
