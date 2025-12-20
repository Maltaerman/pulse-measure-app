<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

import { useAchievements } from '@/composables/useAchievements';

const AchievementItem = defineAsyncComponent(
  () => import('@/components/achievements/AchievementItem.vue')
);

const { getAchievementsList, achievementsList } = useAchievements();

getAchievementsList();
</script>

<template>
  <div class="flex flex-col gap-4">
    <p
      class="text-lg font-semibold col-span-2 text-neutral-800"
      v-text="'Achievements view'"
    />

    <div
      v-if="achievementsList.length"
      class="grid grid-cols-2 gap-4"
    >
      <AchievementItem
        v-for="achievement in achievementsList"
        :key="achievement.id"
        v-bind="achievement"
      />
    </div>
  </div>
</template>