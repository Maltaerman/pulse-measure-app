<script setup lang="ts">
import BaseTitle from '@/components/bases/BaseTitle.vue';
import BaseThemeToggle from '@/components/bases/BaseThemeToggle.vue'
import AchievementsList from '@/components/main/AchievementsList.vue'
import LastMeasure from '@/components/main/LastMeasure.vue'
import LastMeasureGraph from '@/components/main/LastMeasureGraph.vue'
import BaseButton from '@/components/bases/BaseButton.vue'

import { useMeasure } from '@/composables/useMeasure';

const { resetMeasureList } = useMeasure();

function resetMeasureData() {
  resetMeasureList();

  console.log('empty')
}

function getPWA() {
  console.log('getPWA')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-2 gap-4">
      <BaseTitle>{{ $t('global_achievements') }}</BaseTitle>

      <AchievementsList class="col-span-2" />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <BaseTitle class="col-span-2 ">
        Last measure
      </BaseTitle>

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
