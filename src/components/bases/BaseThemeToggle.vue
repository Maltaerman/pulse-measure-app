<script setup lang="ts">
import BaseButton from '@/components/bases/BaseButton.vue';

import { useTheme } from '@/composables/useTheme';

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <BaseButton
    theme="secondary"
    @click="toggleTheme"
  >
    <slot v-bind="{ theme }">
      Mode / {{ theme }}
    </slot>
  </BaseButton>
</template>
