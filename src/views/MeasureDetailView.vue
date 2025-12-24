<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

import BaseTitle from '@/components/bases/BaseTitle.vue';

import { useMeasure } from '@/composables/useMeasure';

const MeasureListItemDetail = defineAsyncComponent(
  () => import('@/components/measure-list/MeasureListItemDetail.vue')
);

const route = useRoute();

const { measureList, getMeasureList } = useMeasure();

if (!measureList.value.length) getMeasureList();

const measureData = computed(() => measureList.value.find(({ id }) => id === route.params.id));
</script>

<template>
  <div class="flex flex-col gap-4">
    <BaseTitle>{{ measureData?.id ? 'Measure data:' : 'Measure don not exist' }}</BaseTitle>

    <MeasureListItemDetail
      v-if="measureData"
      v-bind="measureData"
    />
  </div>
</template>