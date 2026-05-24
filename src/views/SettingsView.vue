<script setup lang="ts">
import { reactive } from 'vue'

import BaseToggle from '@/components/bases/BaseToggle.vue'

import { useLocalTime } from '@/composables'

import { useTheme, THEME_ENUM } from '@/composables'

const { theme, toggleTheme } = useTheme()
const { localTime } = useLocalTime()

const state = reactive({
  reminder: true,
  vibration: true,
  appleHealth: true,
})
</script>

<template>
  <section>
    <div
      class="bg-bg-card text-text-primary border border-border rounded-lg shadow-sm p-4 flex flex-col gap-4"
    >
      <div class="flex items-center justify-between py-2">
        <span class="text-sm" v-text="$t('settings_reminder')" />

        <BaseToggle v-model="state.reminder" is-disabled />
      </div>

      <div class="flex items-center justify-between py-2">
        <span class="text-sm" v-text="$t('settings_vibrations')" />

        <BaseToggle v-model="state.vibration" is-disabled />
      </div>

      <div class="flex items-center justify-between py-2">
        <span class="text-sm" v-text="$t('settings_local-time')" />

        <button type="button" class="text-sm text-text-secondary hover:text-text-primary">
          {{ localTime }}
        </button>
      </div>

      <div class="flex items-center justify-between py-2">
        <span class="text-sm" v-text="$t('settings_app-health')" />

        <BaseToggle v-model="state.appleHealth" is-disabled />
      </div>

      <div class="flex items-center justify-between py-2">
        <p class="text-sm">
          {{ $t('settings_color-theme') }} /
          <span class="text-primary font-black uppercase" v-text="theme" />
        </p>

        <BaseToggle
          :model-value="theme === THEME_ENUM.DARK"
          @update:model-value="toggleTheme"
          @click="toggleTheme"
        />
      </div>
    </div>
  </section>
</template>
