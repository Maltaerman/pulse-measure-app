<script setup lang="ts">
import { format } from 'date-fns'
import { PAGE_NAME_ENUM } from '@/router'

import { useMeasure } from '@/composables/useMeasure'

import BaseIcon from '@/components/bases/BaseIcon.vue'

export interface IProps {
  id: number
  bpm: number
  createdAt: number
  measure: number[]
}

const props = withDefaults(defineProps<IProps>(), {
  bpm: 0,
  createdAt: 0,
  measure: [],
})

const { deleteMeasure } = useMeasure()

import MeasureDetailGraph from '@/components/measure-detail/MeasureDetailGraph.vue'

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


    <MeasureDetailGraph
      class="min-w-40 w-full h-8"
      :data="props.measure"
      :borderWidth="1"
    />


    <div class="flex items-center gap-2">
      <span class="text-text-primary font-semibold text-lg" v-text="$attrs.bpm" />

      <button
        type="button"
        @click.stop="deleteMeasure(props.id)"
      >
        <BaseIcon class="size-4 text-danger" name="bin" />
      </button>

      <BaseIcon class="size-4 -rotate-90 text-text-primary" name="arrow" />
    </div>
  </div>
</template>
