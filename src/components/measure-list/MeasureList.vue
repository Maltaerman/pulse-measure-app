<script setup lang="ts">
import { format } from 'date-fns'

import MeasureListItem from './MeasureListItem.vue'
import { useMeasure } from '@/composables/useMeasure'

const { measureList, getMeasureList } = useMeasure()

getMeasureList()
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="measureListItem in measureList"
      :key="measureListItem.id"
      class="flex flex-col gap-2"
    >
      <p
        class="text-text-primary font-bold text-lg transition-colors duration-300"
        v-text="format(measureListItem.createdAt, 'MMMM d, yyyy')"
      />

      <MeasureListItem v-bind="measureListItem" />
    </div>
  </div>
</template>
