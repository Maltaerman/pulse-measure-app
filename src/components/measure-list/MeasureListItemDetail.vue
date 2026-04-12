<script setup lang="ts">
import { PAGE_NAME_ENUM } from '@/router'

import BaseLabel from '@/components/bases/BaseLabel.vue'
import BaseButton from '@/components/bases/BaseButton.vue'
import MeasureDetailGraph from '@/components/measure-detail/MeasureDetailGraph.vue'

import { useMeasure } from '@/composables/useMeasure'

export interface IProps {
  id: string
  bpm: number
  measure: number[]
}

const props = withDefaults(defineProps<IProps>(), {
  id: '',
  bpm: 0,
  measure: () => [],
})

const { deleteMeasure } = useMeasure()
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="rounded-lg p-4 bg-bg-card shadow-md border border-border flex flex-col gap-4">
      <div class="flex items-end gap-2">
        <p class="text-5xl font-bold text-primary" v-text="props.bpm" />

        <p class="text-lg text-text-secondary mb-1" v-text="'bpm'" />
      </div>

      <div class="flex items-center gap-2">
        <BaseLabel theme="secondary">Normal</BaseLabel>

        <span class="text-sm text-text-secondary" v-text="'60–100 bpm'" />
      </div>

      <MeasureDetailGraph class="w-full h-40" :data="props.measure" />
    </div>

    <button
      class="w-full p-4 rounded-lg bg-bg-card border border-border text-left text-text-primary"
    >
      Add a Note
    </button>

    <button
      class="w-full p-4 rounded-lg bg-bg-card border border-border text-left text-text-primary"
    >
      Share Data
    </button>

    <BaseButton
      class="capitalize"
      size="lg"
      @click="
        async () => {
          await deleteMeasure(props.id)

          $router.push({ name: PAGE_NAME_ENUM.MEASURE_LIST })
        }
      "
    >
      Delete measure
    </BaseButton>
  </div>
</template>
