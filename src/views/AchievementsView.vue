<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

import { useAchievements } from '@/composables/useAchievements';

const AchievementItemExtended = defineAsyncComponent(
  () => import('@/components/achievements/AchievementItemExtended.vue')
);

const { getAchievementsList, achievementsList } = useAchievements();

getAchievementsList();
</script>

<template>
  <div class="flex flex-col gap-5">
    <p
      class="text-lg font-semibold col-span-2 text-neutral-800"
      v-text="'Achievements'"
    />

    <div class="col-span-2">
      <p
        class="text-sm font-semibold text-neutral-600"
        v-text="'How it works'"
      />

      <p
        class="text-sm font-normal text-neutral-400"
        v-text="'Your achievements are based on how often you measure your pulse and review your data. The more consistent you are, the more milestones you unlock—helping you build better heart-care habits.'"
      />
    </div>

    <div
      v-if="achievementsList.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5"
    >
      <AchievementItemExtended
        v-for="achievement in achievementsList"
        :key="achievement.id"
        v-bind="achievement"
      />
    </div>
  </div>
</template>