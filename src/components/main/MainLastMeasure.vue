<script setup lang="ts">
import { computed } from 'vue'
import { PAGE_NAME_ENUM } from '@/router'
import { format } from 'date-fns'

import BaseIcon from '@/components/base/BaseIcon.vue'
import MeasureDetailGraph from '@/components/measure-detail/MeasureDetailGraph.vue'

import { useMeasureDetail } from '@/composables'

export interface IProps {
  id: number
  userId: string
  createdAt: number
  measure: number[]
}

const props = withDefaults(defineProps<IProps>(), {})

const measureData = computed(() => ({
  id: props.id,
  userId: props.userId,
  createdAt: props.createdAt,
  measure: props.measure,
}))

const { bpmAvg } = useMeasureDetail(measureData)
</script>

<template>
  <div
    class="flex items-center justify-between gap-4 bg-card border border-border bg-bg-card rounded-lg px-4 py-3 hover:bg-bg-muted transition-colors duration-300 cursor-pointer"
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
        <p
          class="text-text-secondary text-sm font-bold transition-colors duration-300"
          v-text="format(props.createdAt, 'HH:m')"
        />

        <p
          class="text-text-muted text-xs transition-colors duration-300"
          v-text="`${bpmAvg} bpm`"
        />
      </div>
    </div>

    <MeasureDetailGraph class="max-w -40 w-fit h-9" :data="props.measure" :borderWidth="1" />

    <button
      class="flex flex-row gap-1 items-center justify-center text-text-secondary hover:text-text-primary active:text-text-primary cursor-pointer transition-colors duration-300"
      @click.stop="$router.push({ name: PAGE_NAME_ENUM.MEASURE_LIST })"
    >
      {{ $t('global_view-all') }}

      <BaseIcon class="size-4 -rotate-90" name="arrow" />
    </button>
  </div>
</template>
