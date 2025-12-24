<script setup lang="ts">
import HistoryListItem from './HistoryListItem.vue';
import { useMeasure } from '@/composables/useMeasure';

const { measureList } = useMeasure();
</script>

<template>
  <div class="flex flex-col gap-4">
    <HistoryListItem
      v-for="historyListItem in measureList"
      :key="historyListItem.id"
      v-bind="historyListItem"
    />
  </div>
</template>
