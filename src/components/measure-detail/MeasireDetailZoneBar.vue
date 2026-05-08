<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()

const ZONES_ENUM = [
  { key: 'rest', color: '#4fc3f7', leftShift: '12%' },
  { key: 'fat-burn', color: '#81c784', leftShift: '36%' },
  { key: 'cardio', color: '#ffb74d', leftShift: '62%' },
  { key: 'peak', color: '#e05a3a', leftShift: '84%' },
]

export interface IProps {
  zone: number
}

const props = withDefaults(defineProps<IProps>(), {
  zone: 0,
})
</script>

<template>
  <div class="bg-bg-card border border-border shadow-sm rounded-lg px-4 py-3">
    <p
      class="text-xs font-medium uppercase text-text-muted mb-2"
      v-text="$t('measure_detail_zone-bar_title')"
    />

    <div
      class="h-2 rounded-full relative mb-1"
      style="background: linear-gradient(to right, #4fc3f7, #81c784, #ffb74d, #e05a3a)"
    >
      <div class="absolute -top-1 h-4 w-1 rounded-full bg-text-primary" :style="{ left: '80% ' }" />
    </div>

    <div class="relative h-4">
      <p
        v-for="{ key, leftShift } in ZONES_ENUM"
        :key="key"
        class="absolute text-xs -translate-x-1/2 text-text-muted"
        :style="{ left: leftShift }"
        v-text="$t(`measure_detail_zone-bar_${key}`)"
      />
    </div>
  </div>
</template>
