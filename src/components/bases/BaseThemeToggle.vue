<script setup lang="ts">
import { ref } from 'vue'

import BaseButton from '@/components/bases/BaseButton.vue';

const THEME_ENUM = {
  DARK: 'dark',
  LIGHT: 'light',
}

const theme = ref(localStorage.getItem('theme') || THEME_ENUM.LIGHT)

function setTheme(value: string) {
  theme.value = value;

  localStorage.setItem('theme', theme.value)

  document.documentElement.dataset.theme = theme.value;
}

setTheme(theme.value)


function toggleTheme() {
  const isDark = theme.value === THEME_ENUM.DARK;

  theme.value = isDark ? THEME_ENUM.LIGHT : THEME_ENUM.DARK;

  setTheme(theme.value)
}
</script>

<template>
  <BaseButton @click="toggleTheme">
    <slot v-bind="{ theme }">
      Mode / {{ theme }}
    </slot>
  </BaseButton>
</template>
