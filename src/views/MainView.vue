<script setup lang="ts">
import { PAGE_NAME_ENUM } from '@/router';

import BaseButton from '@/components/bases/BaseButton.vue';

import { useRandomTitle } from '@/composables/useRandomTitle';

const ROUTES = [
  { label: 'Measure', to: PAGE_NAME_ENUM.MEASURE, },
  { label: 'History', to: PAGE_NAME_ENUM.HISTORY, },
  { label: 'Achievements', to: PAGE_NAME_ENUM.ACHIEVEMENTS, },
  { label: 'Settings', to: PAGE_NAME_ENUM.SETTINGS, },  
];

const { randomTitle } = useRandomTitle();
</script>

<template>
  <div class="flex flex-col gap-4">

    <h1
      class="text-lg font-semibold col-span-2 text-neutral-800"
      v-text="randomTitle"
    />

    <div class="grid grid-cols-2 gap-4">
      <BaseButton
        v-for="{ label, to } in ROUTES"
        :key="label"
        class="aspect-square size-full"
        @click="$router.push({ name: to })"
      >
        {{ label }}
      </BaseButton>
    </div>
  </div>
</template>
