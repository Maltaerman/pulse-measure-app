<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

import { useMeasure } from '@/composables/useMeasure';

const HistoryListItemDetail = defineAsyncComponent(
  () => import('@/components/history/HistoryListItemDetail.vue')
);

const route = useRoute();

const { measureList, getMeasureList } = useMeasure();

if (!measureList.value.length) getMeasureList();

const measureData = computed(() => measureList.value.find(({ id }) => id === route.params.id));
</script>

<template>
  <div class="flex flex-col gap-4">
    <p
      class="text-lg font-semibold col-span-2 text-neutral-800"
      v-text="measureData?.id ? 'Measure data:' : 'Measure don not exist'"
    />

    <HistoryListItemDetail
      v-if="measureData"
      v-bind="measureData"
    />
  </div>
</template>