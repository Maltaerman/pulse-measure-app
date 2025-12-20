<script setup lang="ts">
import BaseThemeToggle from '@/components/bases/BaseThemeToggle.vue'
import Achievements from '@/components/settings/Achievements.vue'
import LastMeasure from '@/components/settings/LastMeasure.vue'
import LastMeasureGraph from '@/components/settings/LastMeasureGraph.vue'
import BaseButton from '@/components/bases/BaseButton.vue'

import { useHistoryList } from '@/components/history/useHistoryList';

const { resetHistoryList } = useHistoryList();

function resetMeasureData() {
  resetHistoryList();

  console.log('empty')
}

function getPWA() {
  console.log('getPWA')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-2 gap-4">
      <p
        class="text-lg font-semibold col-span-2 text-neutral-800"
        v-text="'Achievements'"
      />

      <Achievements class="min-h-40 col-span-2" />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <p
        class="text-lg font-semibold col-span-2 text-neutral-800"
        v-text="'Last measure'"
      />

      <LastMeasure class="aspect-square" />

      <LastMeasureGraph class="aspect-square"  />
    </div>

    <BaseButton
      class="capitalize"
      @click="resetMeasureData"
    >
      Reset measure data
    </BaseButton>

    <BaseButton
      @click="getPWA"
    >
      Get PWA
    </BaseButton>

    <BaseThemeToggle
      class="capitalize"
    />
  </div>
</template>