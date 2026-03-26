<script setup lang="ts">
import { reactive } from "vue"

import BaseToggle from '@/components/bases/BaseToggle.vue'
import BaseIcon from '@/components/bases/BaseIcon.vue';

import { useTheme, THEME_ENUM } from '@/composables/useTheme';

const { theme, toggleTheme } = useTheme();

const state = reactive({
  reminder: true,
  time: "08:00",
  vibration: true,
  appleHealth: true,
})
</script>

<template>
  <section class="p-4">
      <div class="bg-bg-card text-text-primary rounded-lg shadow-md p-4 flex flex-col gap-4">
        <div class="flex items-center justify-between py-2">
          <span
            class="text-sm"
            v-text="'Reminder to Measure'"
          />

          <BaseToggle v-model="state.reminder" />
        </div>

        <div class="flex items-center justify-between py-2">
          <span
            class="text-sm"
            v-text="'Reminder Time'"
          />

          <button
            type="button"
            class="text-sm text-text-secondary hover:text-text-primary"
          >
            {{ state.time }}
          </button>
        </div>

        <div class="flex items-center justify-between py-2">
          <span
            class="text-sm"
            v-text="'Vibration'"
          />
    
          <BaseToggle v-model="state.vibration" />
        </div>

        <div class="pt-2">
          <p class="text-xs text-text-secondary mb-2">
            Heart Rate Zones
          </p>

          <div class="space-y-2">

            <div class="flex justify-between p-3 rounded-lg bg-bg-muted">
              <span class="text-sm">Resting</span>
              <span class="text-sm text-text-muted">&lt; 60 bpm</span>
            </div>

            <div class="flex justify-between p-3 rounded-lg bg-[var(--color-success)/10]">
              <span class="text-sm">Normal</span>
              <span class="text-sm">60 - 100 bpm</span>
            </div>

            <div class="flex justify-between p-3 rounded-lg bg-[var(--color-danger)/10]">
              <span class="text-sm">High</span>
              <span class="text-sm">&gt; 100 bpm</span>
            </div>

          </div>
        </div>

        <div class="flex items-center justify-between py-2">
          <span
            class="text-sm"
            v-text="'Show in Apple Health'"
          />

          <BaseToggle v-model="state.appleHealth" />
        </div>

        <div class="flex items-center justify-between py-3 border-t border-border">
          <span class="text-sm">Data Export</span>

          <BaseIcon
            class="size-4 -rotate-90"
            name="arrow"
          />
        </div>

        <div class="flex items-center justify-between py-2" @click="toggleTheme">
          <p
            class="text-sm"
          >
            Mode / <span class="text-primary font-black uppercase">{{ theme }}</span>
          </p>
    
          <BaseToggle
            :model-value="theme === THEME_ENUM.DARK"
            @update:model-value="toggleTheme"
          />
        </div>
      </div>
  </section>
</template>
