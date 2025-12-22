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
    sizeClasses: 'w-full h-2',
    transitionClasses: 'transition-colors duration-300',
  }
);


const BACKGROUND_MAP = {
  orange: 'bg-accent-orange',
  yellow: 'bg-accent-yellow',
  green: 'bg-accent-green',
  blue: 'bg-accent-blue',
  pink: 'bg-accent-pink',
  violet: 'bg-accent-violet',
  grey: 'bg-accent-grey',
};


const bgColorClass = computed(() => BACKGROUND_MAP[props.theme]);
</script>

<template>
  <div
    class="relative rounded-sm"
    :class="[props.sizeClasses, props.transitionClasses]"
  >
    <div
      class="relative overflow-hidden rounded-sm border border-neutral-100"
      :class="props.sizeClasses"
    >
      <div
        v-show="props.progress"
        class="h-full border-r border-transparent"
        :class="bgColorClass"
        :style="{ width: `${props.progress}%` }"
      />
    </div>
  </div>
</template>
