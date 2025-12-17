<script setup lang="ts">
import { useTemplateRef, ref, watch, computed } from 'vue';

export type IconFormat = 'svg' | 'webp' | 'png';

export interface IProps {
  name: string;
  format?: IconFormat;
  fill?: string
  stroke?: string;
  transitionClass?: string;
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    name: '',
    format: 'svg',
    fill: 'span',
    stroke: 'span',
    transitionClass: 'span',
  }
);

const baseIconRef = useTemplateRef('baseIconRef');

const isSvg = computed(() => props.format === 'svg');

const svgModules = import.meta.glob('/src/assets/icons/*.svg', {
  eager: true,
  import: 'default',
});

const icon = ref('');

async function loadIcon() {
  console.log('svgModules', svgModules, isSvg.value)

  if (isSvg.value) {
    const svgPath = `/src/assets/icons/${props.name}.svg`;
    const svgIcon = svgModules[svgPath];

    if (!svgIcon) throw new Error('Svg Icon with this name does not exist');

    icon.value = svgIcon as string;

    return;
  }
}

watch(() => props.name, loadIcon, { immediate: true });
</script>

<template>
  <img
    :src="icon"
    ref="baseIconRef"
    class="baseIcon duration-300"
    :class="props.transitionClass"
    :fill="props.fill"
    :stroke="props.stroke"
  />
</template>
