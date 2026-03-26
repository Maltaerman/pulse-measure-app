<script setup lang="ts">
import { PAGE_NAME_ENUM } from '@/router'

import { useTheme, THEME_ENUM } from '@/composables/useTheme';

const { theme, toggleTheme } = useTheme();

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
  <header class="relative bg-bg/80 backdrop-blur-md border-b border-border flex flex-row justify-between items-center py-2 px-4 transition-colors duration-300">

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
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-text-primary transition-colors duration-300"
      @click="$router.push({ name: PAGE_NAME_ENUM.MAIN })"
    >
      Heart<span class="text-primary">Rate</span>
    </h1>

    <div class="flex flex-row gap-4 ml-auto">
      <button
        @click="toggleTheme"
      >
        <svg  class="size-6 fill-primary" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
          <path d="M 14.984375 0.98632812 A 1.0001 1.0001 0 0 0 14 2 L 14 5 A 1.0001 1.0001 0 1 0 16 5 L 16 2 A 1.0001 1.0001 0 0 0 14.984375 0.98632812 z M 5.796875 4.7988281 A 1.0001 1.0001 0 0 0 5.1015625 6.515625 L 7.2226562 8.6367188 A 1.0001 1.0001 0 1 0 8.6367188 7.2226562 L 6.515625 5.1015625 A 1.0001 1.0001 0 0 0 5.796875 4.7988281 z M 24.171875 4.7988281 A 1.0001 1.0001 0 0 0 23.484375 5.1015625 L 21.363281 7.2226562 A 1.0001 1.0001 0 1 0 22.777344 8.6367188 L 24.898438 6.515625 A 1.0001 1.0001 0 0 0 24.171875 4.7988281 z M 15 8 A 7 7 0 0 0 8 15 A 7 7 0 0 0 15 22 A 7 7 0 0 0 22 15 A 7 7 0 0 0 15 8 z M 2 14 A 1.0001 1.0001 0 1 0 2 16 L 5 16 A 1.0001 1.0001 0 1 0 5 14 L 2 14 z M 25 14 A 1.0001 1.0001 0 1 0 25 16 L 28 16 A 1.0001 1.0001 0 1 0 28 14 L 25 14 z M 7.9101562 21.060547 A 1.0001 1.0001 0 0 0 7.2226562 21.363281 L 5.1015625 23.484375 A 1.0001 1.0001 0 1 0 6.515625 24.898438 L 8.6367188 22.777344 A 1.0001 1.0001 0 0 0 7.9101562 21.060547 z M 22.060547 21.060547 A 1.0001 1.0001 0 0 0 21.363281 22.777344 L 23.484375 24.898438 A 1.0001 1.0001 0 1 0 24.898438 23.484375 L 22.777344 21.363281 A 1.0001 1.0001 0 0 0 22.060547 21.060547 z M 14.984375 23.986328 A 1.0001 1.0001 0 0 0 14 25 L 14 28 A 1.0001 1.0001 0 1 0 16 28 L 16 25 A 1.0001 1.0001 0 0 0 14.984375 23.986328 z"></path>
        </svg>
      </button>
    
      <button
        class="text-text-secondary hover:text-text-primary"
        @click="$router.push({ name: PAGE_NAME_ENUM.SETTINGS })"
      >
        <svg class="size-6" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm8 4a8 8 0 01-.34 2.3l2.04 1.58-2 3.46-2.42-.98a8.03 8.03 0 01-2 1.15l-.36 2.54H9.08l-.36-2.54a8.03 8.03 0 01-2-1.15l-2.42.98-2-3.46 2.04-1.58A8 8 0 014 12c0-.8.12-1.57.34-2.3L2.3 8.12l2-3.46 2.42.98a8.03 8.03 0 012-1.15L9.08 2h5.84l.36 2.54a8.03 8.03 0 012 1.15l2.42-.98 2 3.46-2.04 1.58c.22.73.34 1.5.34 2.3z"/>
        </svg>
      </button>
    </div>
  </header>
</template>
