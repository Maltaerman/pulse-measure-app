<script setup lang="ts">
import { format } from 'date-fns'
import { defineAsyncComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

import BaseLoader from '@/components/bases/BaseLoader.vue'

import { useMeasure } from '@/composables/useMeasure'

const MeasureListItemDetail = defineAsyncComponent(
  () => import('@/components/measure-list/MeasureListItemDetail.vue'),
)

const route = useRoute()

const { measureList, isLoadingMeasureList, getMeasureList } = useMeasure()

getMeasureList()

const measureData = computed(() => measureList.value.find(({ id }) => id === route.params.id))
</script>

<template>
  <Transition mode="out-in" name="transition-fade">
    <BaseLoader v-if="isLoadingMeasureList && measureList.length === 0" class="size-20 m-auto" />

    <section v-else class="flex flex-col gap-4">
      <h3
        v-if="measureData?.createdAt"
        class="text-lg font-bold text-text-secondary"
        v-text="format(measureData.createdAt, 'MMMM d, yyyy')"
      />

      <MeasureListItemDetail v-if="measureData" v-bind="{ ...measureData, id: Number(measureData.id) }" />
    </section>
  </Transition>
</template>
