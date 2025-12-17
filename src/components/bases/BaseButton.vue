<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue';

const BaseLoader = defineAsyncComponent(() => import('@/components/bases/BaseLoader.vue'));

type ButtonType = 'button' | 'submit';
type ButtonTheme = 'primary' | 'secondary';
type ButtonSize = 'md' | 'lg';

export interface IProps {
  type?: ButtonType;
  theme?: ButtonTheme;
  size?: ButtonSize;
  isDisabled?: boolean;
  isLoading?: boolean;
  transitionClasses?: string;
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    type: 'button',
    theme: 'primary',
    size: 'md',
    isDisabled: false,
    isLoading: false,
    transitionClasses: 'transition-colors duration-300',
  }
);

const HEIGHT_MAP = {
  md: 'h-8',
  lg: 'h-11',
};

const PADDING_MAP = {
  md: 'px-4',
  lg: 'px-8',
};

const ROUNDED_MAP = {
  md: 'rounded-sm',
  lg: 'rounded-md',
};

const TEXT_MAP = {
  md: 'text-light font-normal text-sm',
  lg: 'text-light font-bold text-lg',
};

const isPointerEventsNone = computed(() => props.isDisabled || props.isLoading);

const textClasses = computed(() => TEXT_MAP[props.size]);

const roundedClass = computed(() => ROUNDED_MAP[props.size]);

const heightClass = computed(() => HEIGHT_MAP[props.size]);

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
  <button
    class="relative flex items-center justify-center hover:cursor-pointer"
    :class="[
      heightClass,
      paddingClass,
      roundedClass,
      textColorClass,
      backgroundClasses,
      props.transitionClasses,
      { 'pointer-events-none': isPointerEventsNone },
    ]"
  >
    <div class="flex size-full shrink-0 items-center justify-center">
      <slot name="content">
        <BaseLoader
          v-if="props.isLoading"
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-4"
        />

        <span
          class="truncate"
          :class="[textClasses, { invisible: props.isLoading }]"
        >
          <slot />
        </span>
      </slot>
    </div>
  </button>
</template>
