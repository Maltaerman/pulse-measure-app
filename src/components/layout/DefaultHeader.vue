<script setup lang="ts">
import { PAGE_NAME_ENUM } from '@/router'

import BaseThemeToggle from '@/components/bases/BaseThemeToggle.vue';

const LEFT_NAVIGATION = {
  [PAGE_NAME_ENUM.MAIN]: {
    to: { name: PAGE_NAME_ENUM.MEASURE_LIST },
    icon: 'iconNameMockup',
  },

  [PAGE_NAME_ENUM.MEASURE_LIST]: {
    to: { name: PAGE_NAME_ENUM.MAIN },
    icon: 'iconNameMockup',
  },

  [PAGE_NAME_ENUM.MEASURE_ITEM]: {
    to: { name: PAGE_NAME_ENUM.MEASURE_LIST },
    icon: 'iconNameMockup',
  },
};
</script>

<template>
  <header class="bg-bg/80 backdrop-blur-md border-b border-border flex flex-row justify-between items-center py-2 px-4 transition-colors duration-300">

    <button
      v-if="LEFT_NAVIGATION[$route.name as string]"
      class="text-text-secondary hover:text-text-primary"
      @click="$router.push(LEFT_NAVIGATION[$route.name as string].to)"
    >
      <svg class="size-6" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>

    <h1
      class="text-lg font-bold text-text-primary transition-colors duration-300"
      @click="$router.push({ name: PAGE_NAME_ENUM.MAIN })"
    >
      Heart<span class="text-primary">Rate</span>
    </h1>

    <BaseThemeToggle />

    <button
      class="text-text-secondary hover:text-text-primary"
      @click="$router.push({ name: PAGE_NAME_ENUM.SETTINGS })"
    >
      <svg class="size-6" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm8 4a8 8 0 01-.34 2.3l2.04 1.58-2 3.46-2.42-.98a8.03 8.03 0 01-2 1.15l-.36 2.54H9.08l-.36-2.54a8.03 8.03 0 01-2-1.15l-2.42.98-2-3.46 2.04-1.58A8 8 0 014 12c0-.8.12-1.57.34-2.3L2.3 8.12l2-3.46 2.42.98a8.03 8.03 0 012-1.15L9.08 2h5.84l.36 2.54a8.03 8.03 0 012 1.15l2.42-.98 2 3.46-2.04 1.58c.22.73.34 1.5.34 2.3z"/>
      </svg>
    </button>
  </header>
</template>
