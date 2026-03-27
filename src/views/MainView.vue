<script setup lang="ts">
import { PAGE_NAME_ENUM } from '@/router'
import { computed } from 'vue'

import LastMeasure from '@/components/main/LastMeasure.vue'

import { useMeasure } from '@/composables/useMeasure'

const { getMeasureList, measureList } = useMeasure()

getMeasureList()

const lastMeasureData = computed(() => measureList.value[0])
</script>

<template>
  <section class="flex-1 flex flex-col items-center justify-center">
    <button
      type="button"
      class="relative flex flex-col items-center justify-center"
      @click="$router.push({ name: PAGE_NAME_ENUM.MEASURE })"
    >
      <div
        class="absolute w-48 h-48 bg-primary/10 rounded-full animate-ping [animation-delay:100ms]"
      />
      <div
        class="absolute w-36 h-36 bg-primary/20 rounded-full animate-ping [animation-delay:500ms]"
      />
      <div
        class="absolute w-28 h-28 bg-primary/30 rounded-full animate-ping [animation-delay:900ms]"
      />

      <div
        class="text-6xl font-bold text-primary animate-heartbeat"
        v-text="lastMeasureData?.bpm || 0"
      />

      <p class="text-text-secondary uppercase" v-text="'bpm'" />
    </button>

    <LastMeasure
      v-if="lastMeasureData"
      v-bind="lastMeasureData"
      class="w-[calc(100%-16px)] absolute bottom-2"
    />
  </section>
</template>
