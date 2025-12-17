<script setup lang="ts">
import { computed } from 'vue';

import BaseIcon from '@/components/bases/BaseIcon.vue';

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },

  theme: {
    type: String,
    default: 'primary',
    validator: (theme: string) => ['primary', 'secondary'].includes(theme),
  },

  size: {
    type: String,
    default: 'md',
    validator: (size: string) => ['md'].includes(size),
  },

  tag: {
    type: [Object, String],
    default: () => 'button',
  },

  iconName: {
    type: [String],
    default: '',
  },

  iconPosition: {
    type: String,
    default: 'left',
    validator: (position: string) => ['left', 'right'].includes(position),
  },

  iconRotate: {
    type: String,
    default: '',
  },

  iconFormat: {
    type: String,
    default: 'svg',
    validator: (format: string) => ['svg', 'webp', 'png'].includes(format),
  },
});

const emit = defineEmits(['set-tab']);

const TEXT_STYLE_MAP = {
  primary: 'text-xs font-bold',
  secondary: 'text-sm font-medium underline',
};

const textStyleMap = computed(() => TEXT_STYLE_MAP[props.theme]);

const ROUNDED_MAP = {
  primary: 'rounded-20',
  secondary: 'rounded-24',
};

const roundedClass = computed(() => ROUNDED_MAP[props.theme]);

const PADDINGS_MAP = {
  primary: 'px-3 py-2',
  secondary: 'px-3 py-2',
};

const paddingClass = computed(() => PADDINGS_MAP[props.theme]);

const bgColorClass = computed(() => {
  const themes = {
    primary: 
      props.isActive
        ? 'bg-neutral-200'
        : 'bg-transparent can-hover:hover:bg-neutral-200'
    ,
    light:
      props.isActive
        ? 'bg-neutral-400'
        : 'bg-transparent can-hover:hover:bg-neutral-500'
    ,
  };

  return themes[props.theme] ?? '';
});

const textColorClass = computed(() => {
  switch (props.theme) {
    case 'primary':
      return props.isActive ? 'text-light' : 'text-neutral-300 can-hover:hover:text-light';

    case 'secondary':
      return props.isActive ? 'text-light' : 'text-neutral-300 can-hover:hover:text-light';

    default:
      return '';
  }
});
</script>

<template>
  <component
    :is="tag"
    class="flex items-center justify-center gap-2 transition-colors
      duration-300 can-hover:cursor-pointer"
    :class="[
      bgColorClass,
      textColorClass,
      textStyleMap,
      roundedClass,
      paddingClass,
      { 'flex-row-reverse': props.iconPosition === 'right' },
    ]"
    @click="emit('set-tab')"
  >
    <BaseIcon
      v-if="props.iconName"
      class="size-5 shrink-0"
      :class="props.iconRotate"
      :format="props.iconFormat"
      :name="props.iconName"
      transition-class="transition-transform"
    />

    <span class="truncate translate-z-0">
      <slot />
    </span>
  </component>
</template>
