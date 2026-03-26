<script setup lang="ts">
import { format } from "date-fns";
import { defineAsyncComponent, computed } from 'vue';
import { useRoute } from 'vue-router';

import MeasureListHeader from '@/components/measure-list/MeasureListHeader.vue';

import { useMeasure } from '@/composables/useMeasure';

const route = useRoute();

const MeasureListItemDetail = defineAsyncComponent(
  () => import('@/components/measure-list/MeasureListItemDetail.vue')
);

const { measureList, getMeasureList } = useMeasure();

getMeasureList();

const measureData = computed(() => measureList.value.find(({ id }) => id === route.params.id));
</script>

<template>
  <section class="flex flex-col gap-4">
    <h3
      v-if="measureData?.createdAt"
      class="text-lg font-bold text-text-secondary"
      v-text="format(measureData.createdAt, 'MMMM d, yyyy')"
    />

    <MeasureListItemDetail
      v-if="measureData"
      v-bind="measureData"
    />
  </section>
</template>