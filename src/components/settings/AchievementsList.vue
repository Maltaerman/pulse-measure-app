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
  <div
    v-if="achievementsList.length"
    class="flex flex-row gap-4 p-2 overflow-scroll -mx-2 px-2"
  >
    <AchievementItem
      v-for="achievement in achievementsList"
      :key="achievement.id"
      class="size-30 shrink-0"
      v-bind="achievement"
    />
  </div>
</template>