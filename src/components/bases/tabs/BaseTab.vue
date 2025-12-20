<script setup lang="ts">
import { computed } from 'vue';

type TabTag = 'button';
type TabTheme = 'primary' | 'secondary';
type TabSize = 'md' | 'lg';

export interface IProps {
  tag?: TabTag;
  theme?: TabTheme;
  size?: TabSize;
  isDisabled?: boolean;
  transitionClasses?: string;
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    tag: 'button',
    theme: 'primary',
    size: 'md',
    isDisabled: false,
    transitionClasses: 'transition-colors duration-300',
  }
);

const emit = defineEmits(['set-tab']);

const TEXT_MAP = {
  primary: 'text-light font-normal text-sm',
  secondary: 'text-light font-bold text-lg',
};

const ROUNDED_MAP = {
  primary: 'rounded-20',
  secondary: 'rounded-24',
};

const PADDING_MAP = {
  md: 'py-1 px-4',
  lg: 'py-2 px-8',
};

const textClasses = computed(() => TEXT_MAP[props.theme]);

const roundedClass = computed(() => ROUNDED_MAP[props.theme]);

const paddingClass = computed(() => PADDING_MAP[props.size]);

const textColorClass = computed(
  () => {
    switch (props.theme) {
      case 'primary':
        return props.isDisabled ? 'text-neutral-400' : 'text-light';

      case 'secondary':
        return props.isDisabled ? 'text-neutral-200' : 'text-light';

      default:
        return '';
    }
  }
);

const backgroundClasses = computed(
  () => {
    switch (props.theme) {
      case 'primary':
        return props.isDisabled ? 'bg-neutral-100' : 'bg-primary-500 hover:bg-primary-600 active:bg-primary-400';

      case 'secondary':
        return props.isDisabled ? 'bg-neutral-100' : 'bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-400';

      default:
        return '';
    }
  }
);
</script>

<template>
  <component
    :is="tag"
    class="flex items-center justify-center gap-2 hover:cursor-pointer"
    :class="[
     textClasses,
     roundedClass,
     paddingClass,
     textColorClass,
     backgroundClasses,
     props.transitionClasses,
    ]"
    @click="emit('set-tab')"
  >
    <span class="truncate translate-z-0">
      <slot />
    </span>
  </component>
</template>
