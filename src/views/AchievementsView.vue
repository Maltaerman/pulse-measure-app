<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

import BaseTitle from '@/components/bases/BaseTitle.vue';
import BaseDrawer from '@/components/bases/drawer/BaseDrawer.vue';
import { useDrawer } from '@/components/bases/drawer/useDrawer';

import { useAchievements } from '@/composables/useAchievements';

const AchievementItemExtended = defineAsyncComponent(
  () => import('@/components/achievements/AchievementItemExtended.vue')
);

const { getAchievementsList, achievementsList } = useAchievements();
const { openDrawer } = useDrawer();

getAchievementsList();
</script>

<template>
  <div class="flex flex-col gap-5">
    <BaseDrawer>
      <div class="p-4">
        <p
          class="text-sm font-normal text-neutral-800"
          v-text="$t('achievements_hiw_description')"
        />
      </div>
    </BaseDrawer>

    <div class="flex flex-row gap-4 justify-between">
      <BaseTitle class="col-span-2 ">
        {{ $t('global_achievements') }}
      </BaseTitle>

      <button
        class="w-fit"
        type="button"
        @click="openDrawer"
      >
        <p
          class="text-sm font-semibold text-neutral-600"
          v-text="$t('global_hiw')"
        />
      </button>
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