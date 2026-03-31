<script setup lang="ts">
import { format } from 'date-fns'

import { PAGE_NAME_ENUM } from '@/router'

import BaseIcon from '@/components/bases/BaseIcon.vue'

export interface IProps {
  id: string
  bpm: number
  createdAt: number
}

const props = withDefaults(defineProps<IProps>(), {
  id: '',
  bpm: 0,
  createdAt: 0,
})
</script>

<template>
  <div
    class="bg-card border border-border bg-bg-card rounded-lg px-4 py-3 flex items-center justify-between hover:bg-bg-muted transition-colors duration-300"
    @click="
      $router.push({
        name: PAGE_NAME_ENUM.MEASURE_ITEM,
        params: { id: props.id },
      })
    "
  >
    <div class="flex items-center gap-3">
      <BaseIcon class="size-6 text-primary" name="heart" />

      <div class="flex flex-col">
        <span
          class="text-text-secondary text-sm font-bold transition-colors duration-300"
          v-text="format(props.createdAt, 'HH:MM')"
        />

        <span
          class="text-text-muted text-xs transition-colors duration-300"
          v-text="`${props.bpm} bpm`"
        />
      </div>
    </div>

    <div class="h-10 w-full">
      <svg viewBox="0 0 300 60" class="size-full">
        <path
          d="M0 30 L20 30 L30 28 L40 45 L50 15 L60 30 L80 30 L90 25 L100 40 L110 20 L130 30 L160 30 L170 26 L180 38 L190 22 L210 30 L240 30 L250 24 L260 40 L270 18 L290 30 L300 30"
          fill="none"
          stroke="var(--color-primary)"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </div>

    <div class="flex items-center gap-2">
      <span class="text-text-primary font-semibold text-lg" v-text="$attrs.bpm" />

      <BaseIcon class="size-4 -rotate-90" name="arrow" />
    </div>
  </div>
</template>
