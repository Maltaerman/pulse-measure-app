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
    class="bg-bg-card rounded-lg p-3 border border-border flex flex-col gap-2"
    @click="$router.push({ name: PAGE_NAME_ENUM.MEASURE_LIST })"
  >
    <div class="flex justify-between gap-1">
      <span class="text-text-primary text-md font-medium" v-text="'Last Measure'" />

      <button
        class="flex flex-row gap-1 items-center justify-center text-text-secondary hover:text-text-primary active:text-text-primary"
        @click.prevent
      >
        View all

        <BaseIcon class="size-4 -rotate-90" name="arrow" />
      </button>
    </div>

    <div class="flex justify-between items-center">
      <span
        class="text-text-secondary text-sm font-bold transition-colors duration-300"
        v-text="format(props.createdAt, 'HH:MM')"
      />

      <span class="text-text-muted text-xs transition-colors duration-300" v-text="props.bpm" />
    </div>
  </div>
</template>
