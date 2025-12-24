<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

import MeasureListHeader from '@/components/measure-list/MeasureListHeader.vue';
import MeasureListEmptyState from '@/components/measure-list/MeasureListEmptyState.vue';

import { useMeasure } from '@/composables/useMeasure';

const MeasureList = defineAsyncComponent(
  () => import('@/components/measure-list/MeasureList.vue')
);

const { measureList, getMeasureList } = useMeasure();

getMeasureList();
</script>

<template>
  <section class="flex flex-col gap-4">
    <MeasureListHeader>Your measurements</MeasureListHeader>

    <Transition
      mode="out-in"
      name="transition-fade"
    >
      <MeasureList
        v-if="measureList.length"
        class="w-full"
      />

      <MeasureListEmptyState v-else />
    </Transition>
  </section>
</template>