<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { PAGE_NAME_ENUM } from '@/router';

import { useAchievements } from '@/composables/useAchievements';

const MAX_ACHIEVEMENTS = 5;

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
      v-for="achievement in achievementsList.filter((_, i) => i < MAX_ACHIEVEMENTS)"
      :key="achievement.id"
      class="size-30 shrink-0"
      v-bind="achievement"
    />

    <div
      class="size-30 shrink-0 flex items-center justify-center relative rounded-sm bg-neutral-950 p-2 cursor-pointer"
      @click="$router.push({ name: PAGE_NAME_ENUM.ACHIEVEMENTS })"
    >
      <p
        class="text-center text-neutral-100 text-md font-semibold line-clamp-2"
        v-text="'See All'"
      />
    </div>
  </div>
</template>