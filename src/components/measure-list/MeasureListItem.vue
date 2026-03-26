<script setup lang="ts">
import { format } from "date-fns";

import { PAGE_NAME_ENUM } from '@/router';

import BaseIcon from '@/components/bases/BaseIcon.vue';

export interface IProps {
  id: string;
  bpm: number;
  createdAt: number;
}

const props = withDefaults(defineProps<IProps>(), {
  id: '',
  bpm: 0,
  createdAt: 0,
});
</script>

<template>
  <div
    class="bg-card border border-border bg-bg-card rounded-lg px-4 py-3 flex items-center justify-between hover:bg-bg-muted transition-colors duration-300"
    @click="$router.push({
      name: PAGE_NAME_ENUM.MEASURE_ITEM,
      params: { id: props.id },
    })"
  >
    <div class="flex items-center gap-3">
      <BaseIcon
        class="size-6 text-primary"
        name="heart"
      />

      <div class="flex flex-col">
        <span
          class="text-text-secondary text-sm font-bold transition-colors duration-300"
          v-text="format(props.createdAt, 'HH:MM')"
        />

        <span
          class="text-text-muted text-xs transition-colors duration-300"
          v-text="`${props.bpm} bpm`"
        />
      </div>
    </div>

    <div class="flex items-center gap-2">

      <span
        class="text-text-primary font-semibold text-lg"
        v-text="$attrs.bpm"
      />

      <BaseIcon
        class="size-4 -rotate-90"
        name="arrow"
      />
    </div>
  </div>
</template>
