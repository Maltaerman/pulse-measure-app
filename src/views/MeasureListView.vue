<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import MeasureListEmptyState from '@/components/measure-list/MeasureListEmptyState.vue'

import { useMeasure } from '@/composables/useMeasure'

const MeasureList = defineAsyncComponent(() => import('@/components/measure-list/MeasureList.vue'))

const { measureList, getMeasureList, isLoadingMeasureList } = useMeasure()

getMeasureList()
</script>

<template>
  <section class="flex flex-col gap-4">
    <Transition mode="out-in" name="transition-fade">
      <MeasureList v-if="measureList.length" class="w-full" />

      <MeasureListEmptyState v-else-if="!isLoadingMeasureList && measureList.length === 0" />
    </Transition>
  </section>
</template>
