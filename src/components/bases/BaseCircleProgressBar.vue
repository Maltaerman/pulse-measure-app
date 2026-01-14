<script setup lang="ts">
import { computed } from 'vue';

type ProgressBarTheme = 'orange' | 'yellow' | 'green' | 'blue' | 'pink' | 'violet' | 'grey';

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
    theme: 'orange',
    transitionClasses: 'transition-colors duration-300',
  }
);


const BACKGROUND_MAP = {
  orange: '--color-accent-orange',
  yellow: '--color-accent-yellow',
  green: '--color-accent-green',
  blue: '--color-accent-blue',
  pink: '--color-accent-pink',
  violet: '--color-accent-violet',
  grey: '--color-accent-grey',
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

    <div class="absolute inset-3 bg-white rounded-full flex flex-col items-center justify-center">
      <slot />
    </div>
  </div>
</template>
