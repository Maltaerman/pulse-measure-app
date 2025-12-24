<script setup lang="ts">
export interface IProps {
  tag?: string;
  textClasses?: string;
  transitionClasses?: string;
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    tag: 'h1',
    textClasses: 'text-lg font-semibold text-neutral-800',
    transitionClasses: 'transition-colors duration-300',
  }
);
</script>

<template>
  <component
    :is="props.tag"
    :class="[props.textClasses, props.transitionClasses]"
  >
    <slot />
  </component>
</template>
