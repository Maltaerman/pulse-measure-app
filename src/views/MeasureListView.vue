<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { format } from 'date-fns'

import BaseLoader from '@/components/bases/BaseLoader.vue'

import { useMeasure } from '@/composables/useMeasure'

const MeasureListItem = defineAsyncComponent(
  () => import('@/components/measure-list/MeasureListItem.vue'),
)
const MeasureListEmptyState = defineAsyncComponent(
  () => import('@/components/measure-list/MeasureListEmptyState.vue'),
)

const { measureList, isLoadingMeasureList, getMeasureList } = useMeasure()

getMeasureList()
</script>

<template>
  <section class="relative flex flex-1 flex-col gap-4">
    <Transition mode="out-in" name="transition-fade">
      <BaseLoader v-if="isLoadingMeasureList && measureList.length === 0" class="size-20 m-auto" />

      <div v-else-if="measureList.length > 0">
        <div
          v-for="measureListItem in measureList"
          :key="measureListItem.id"
          class="flex flex-col gap-2"
        >
          <p
            class="text-text-primary font-bold text-lg transition-colors duration-300"
            v-text="format(measureListItem.createdAt, 'MMMM d, yyyy')"
          />

          <MeasureListItem v-bind="{ ...measureListItem, id: Number(measureListItem.id) }" />
        </div>
      </div>

      <MeasureListEmptyState v-else />
    </Transition>
  </section>
</template>
