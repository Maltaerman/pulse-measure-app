<script setup lang="ts">
import { format } from 'date-fns'

import { PAGE_NAME_ENUM } from '@/router'

import BaseIcon from '@/components/base/BaseIcon.vue'
import MeasureDetailGraph from '@/components/measure-detail/MeasureDetailGraph.vue'

export interface IProps {
  id: number
  userId: string
  bpm: number
  createdAt: number
  measure: number[]
}

const props = withDefaults(defineProps<IProps>(), {
  bpm: 0,
  createdAt: 0,
})
</script>

<template>
  <div
    class="flex items-center justify-between gap-4 bg-card border border-border bg-bg-card rounded-lg shadow-sm px-4 py-3 hover:bg-bg-muted transition-colors duration-300 cursor-pointer"
    @click="$router.push({ name: PAGE_NAME_ENUM.MEASURE_LIST })"
  >
    <div class="flex items-center gap-3">
      <BaseIcon class="size-6 text-primary" name="heart" />

      <div class="flex flex-col">
        <p
          class="ftext-text-secondary text-sm font-bold transition-colors duration-300"
          v-text="format(props.createdAt, 'HH:MM')"
        />

        <p
          class="text-text-muted text-xs transition-colors duration-300"
          v-text="`${props.bpm} bpm`"
        />
      </div>
    </div>

    <MeasureDetailGraph class="max-w -40 w-fit h-9" :data="props.measure" :borderWidth="1" />

    <button
      class="flex flex-row gap-1 items-center justify-center text-text-secondary hover:text-text-primary active:text-text-primary cursor-pointer transition-colors duration-300"
      @click.prevent
    >
      {{ $t('global_view-all') }}

      <BaseIcon class="size-4 -rotate-90" name="arrow" />
    </button>
  </div>
</template>
