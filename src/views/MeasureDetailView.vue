<script setup lang="ts">
import { format } from 'date-fns'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import BaseLoader from '@/components/bases/BaseLoader.vue'
import BaseButton from '@/components/bases/BaseButton.vue'

import { useMeasure } from '@/composables/useMeasure'

import MeasireDetailInfo from '@/components/measure-detail/MeasireDetailInfo.vue'
import MeasireDetailZoneBar from '@/components/measure-detail/MeasireDetailZoneBar.vue'

const route = useRoute()

const { measureList, isLoadingMeasureList, getMeasureList } = useMeasure()

getMeasureList()

const measureData = computed(() => measureList.value.find(({ id }) => id === route.params.id))

const measureStats = computed(() => [
  {
    title: 'Min',
    value: measureData.value?.bpmMin || 0,
    subtitle: 'bpm',
  },
  {
    title: 'Average',
    value: measureData.value?.bpmAvg || 0,
    subtitle: 'bpm',
  },
  {
    title: 'Max',
    value: measureData.value?.bpmMax || 0,
    subtitle: 'bpm',
  },
  {
    title: 'Variability',
    value: measureData.value?.hrv || 0,
    subtitle: 'ms HRV',
  },
])

const measureStats2 = computed(() => [
  {
    title: 'time',
    value: format(measureData.value?.createdAt || 0, 'HH:MM'),
  },
  {
    title: 'duration',
    value: measureData.value?.duration || 0,
  },
  {
    title: 'date',
    value: format(measureData.value?.createdAt || 0, 'MMM dd'),
  },
])
</script>

<template>
  <Transition mode="out-in" name="transition-fade">
    <BaseLoader v-if="isLoadingMeasureList && measureList.length === 0" class="size-20 m-auto" />

    <section v-else-if="measureData" class="flex flex-col gap-3 flex-1">
      <MeasireDetailInfo
        :bpmAvg="measureData.bpmAvg || 0"
        :created-at="measureData.createdAt"
        :measure="measureData.measure"
      />

      <div class="grid grid-cols-2 gap-2">
        <div
          v-for="({ title, value, subtitle }, index) in measureStats"
          :key="index"
          class="rounded-lg p-3 flex flex-col items-start gap-0.5"
          :class="index === 1 ? 'bg-primary-active/50' : 'bg-bg-muted'"
        >
          <p
            :class="index === 1 ? 'text-primary' : 'text-text-muted'"
            class="text-xs font-medium uppercase mb-1"
            v-text="title"
          />

          <div class="flex flex-row items-center justify-center gap-1">
            <p
              :class="index === 1 ? 'text-primary' : 'text-text-secondary'"
              class="text-sm font-bold leading-none"
              v-text="value"
            />

            <p
              :class="index === 1 ? 'text-primary' : 'text-text-secondary'"
              class="text-xs font-medium mt-0.5"
              v-text="subtitle"
            />
          </div>
        </div>
      </div>

      <MeasireDetailZoneBar :zone="measureData?.zone || 0" />

      <div class="bg-bg-muted rounded-lg px-4 py-3 flex items-center justify-between">
        <div
          v-for="{ title, value } in measureStats2"
          :key="title"
          class="flex flex-col items-center gap-0.5"
        >
          <span class="text-sm font-bold text-text-primary" v-text="value" />
          <span class="text-xs uppercase text-text-muted" v-text="title" />
        </div>
      </div>

      <BaseButton class="mt-auto" size="lg" @click="() => {}">
        {{ $t('measure_detail_delete') }}
      </BaseButton>
    </section>

    <section v-else>
      <p
        class="size-full m-auto text-center px-4 py-3 text-lg font-medium text-text-primary"
        v-text="'No measure found'"
      />
    </section>
  </Transition>
</template>
