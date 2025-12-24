<script setup lang="ts">
import BaseTitle from '@/components/bases/BaseTitle.vue';
import { defineAsyncComponent } from 'vue';

import { useMeasure } from '@/composables/useMeasure';

const MeasureList = defineAsyncComponent(
  () => import('@/components/measure-list/MeasureList.vue')
);

const { measureList, getMeasureList } = useMeasure();

getMeasureList();
</script>

<template>
  <div>
    <BaseTitle>History</BaseTitle>

    <Transition
      mode="out-in"
      name="transition-fade"
    >
      <MeasureList
        v-if="measureList.length"
        class="w-full"
      />

      <div
        v-else
        class="flex p-2"
      >
        <p
          class="text-lg font-semibold col-span-2 text-neutral-800"
          v-text="'No measure history'"
        />
      </div>      
    </Transition>
  </div>
</template>