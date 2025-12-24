<script setup lang="ts">
import MeasureListItem from './MeasureListItem.vue';
import { useMeasure } from '@/composables/useMeasure';

const { measureList } = useMeasure();
</script>

<template>
  <div class="flex flex-col gap-4">
    <MeasureListItem
      v-for="measureListItem in measureList"
      :key="measureListItem.id"
      v-bind="measureListItem"
    />
  </div>
</template>
