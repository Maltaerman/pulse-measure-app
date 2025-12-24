<script setup lang="ts">
import { useMeasure } from '@/composables/useMeasure';

const { measureList, getMeasureList } = useMeasure();

getMeasureList();
</script>

<template>
  <div class="flex flex-col gap-4 bg-neutral-600 rounded-sm p-2">
    Last measure / {{ measureList[measureList.length -1]?.value || '--' }}
  </div>
</template>