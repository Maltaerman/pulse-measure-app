<script setup lang="ts">
import { computed } from 'vue';

type LabelTheme = 'orange' | 'yellow' | 'green' | 'blue' | 'pink' | 'violet' | 'grey';
type LabelSize = 'md' | 'lg';

export interface IProps {
  theme?: LabelTheme;
  size?: LabelSize
  tag?: string;
  transitionClasses?: string;
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    theme: 'orange',
    size: 'md',
    tag: 'span',
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

const SIZE_MAP = {
  md: 'h-5',
  lg: 'h-8',
};


const PADDING_MAP_MAP = {
  md: 'px-2 py-2',
  lg: 'px-3 py-2',
};

const ROUNDED_MAP = {
  md: 'rounded-sm',
  lg: 'rounded-sm',
};

const TEXT_MAP = {
  md: 'text-light font-normal text-sm',
  lg: 'text-light font-bold text-lg',
};

const bgColorClass = computed(() => BACKGROUND_MAP[props.theme]);

const sizeClasses = computed(() => SIZE_MAP[props.size]);

const paddingClasses = computed(() => PADDING_MAP_MAP[props.size]);

const roundedClass = computed(() => ROUNDED_MAP[props.size]);

const textClasses = computed(() => TEXT_MAP[props.size]);
</script>

<template>
  <component
    :is="props.tag"
    class="flex items-center justify-center whitespace-nowrap
      align-middle"
    :class="[sizeClasses, bgColorClass, roundedClass, paddingClasses, textClasses, props.transitionClasses]"
  >
    <slot />
  </component>
</template>
