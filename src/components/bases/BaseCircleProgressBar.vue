<script setup lang="ts">
import { computed } from 'vue';

type ProgressBarTheme = 'primary' | 'secondary';

export interface IProps {
  progress: number;
  theme?: ProgressBarTheme;
  sizeClasses?: string;
  transitionClasses?: string;
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    progress: 0,
    theme: 'primary',
    transitionClasses: 'transition-colors duration-300',
  }
);

const BACKGROUND_MAP = {
  primary: '--color-primary',
  secondary: '--color-secondary',
};

const progressStyles = computed(() => {
  const value = Math.min(100, Math.max(0, props.progress))

  return {
    background: `
      conic-gradient(
        var(${BACKGROUND_MAP[props.theme]}) ${value}%,
        var(--color-dark) ${value}% 100%
      )
    `,
  }
});
</script>

<template>
  <div
    class="relative isolate"
    :class="props.transitionClasses"
  >
    <div
      class="size-full rounded-full"
      :style="progressStyles"
    />

    <div class="absolute inset-3 bg-light rounded-full flex flex-col items-center justify-center">
      <slot />
    </div>
  </div>
</template>
