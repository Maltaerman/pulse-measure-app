<script setup lang="ts">
// import LastMeasureGraph from '@/components/main/LastMeasureGraph.vue'

import BaseLabel from '@/components/bases/BaseLabel.vue';
import BaseButton from '@/components/bases/BaseButton.vue';


export interface IProps {
  id: string;
  bpm: number;
}

const props = withDefaults(defineProps<IProps>(), {
  id: '',
  bpm: 0,
});
</script>

<template>
    <div class="flex flex-col gap-4">

      <div class="rounded-lg p-4 bg-bg-card shadow-md border border-border flex flex-col gap-4">

        <div class="flex items-end gap-2">
          <p
            class="text-5xl font-bold text-primary"
            v-text="props.bpm"
          />

          <p
            class="text-lg text-text-secondary mb-1"
            v-text="'bpm'"
          />
        </div>

        <div class="flex items-center gap-2">
          <BaseLabel theme="secondary">Normal</BaseLabel>

          <span
            class="text-sm text-text-secondary"
            v-text="'60–100 bpm'"
          />
        </div>

        <div class="h-16 w-full">
          <svg viewBox="0 0 300 60" class="w-full h-full">
            <path
              d="M0 30 L20 30 L30 28 L40 45 L50 15 L60 30 L80 30 L90 25 L100 40 L110 20 L130 30 L160 30 L170 26 L180 38 L190 22 L210 30 L240 30 L250 24 L260 40 L270 18 L290 30 L300 30"
              fill="none"
              stroke="var(--color-primary)"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      <button class="w-full p-4 rounded-lg bg-bg-card border border-border text-left">
        Add a Note
      </button>

      <button class="w-full p-4 rounded-lg bg-bg-card border border-border text-left">
        Share Data
      </button>

      <BaseButton
        class="capitalize"
        size="lg"
        @click="() => {}"
      >
        Reset measure data
      </BaseButton>

    </div>
</template>