<script setup lang="ts">
import { format } from 'date-fns'
import { defineAsyncComponent } from 'vue'

import { DATE_FNS_LOCALES_LIST } from '@/composables'

import BaseIcon from '@/components/bases/BaseIcon.vue'

const MeasureDetailGraph = defineAsyncComponent(() => import('./MeasureDetailGraph.vue'))

export interface IProps {
  bpmAvg: number
  createdAt: number
  measure: number[]
}

const props = withDefaults(defineProps<IProps>(), {})
</script>

<template>
  <div class="bg-bg-card border border-border rounded-lg shadow-sm px-4 py-3 flex flex-col gap-3">
    <div class="flex items-center justify-between">
      <div class="flex items-baseline gap-1.5">
        <span class="text-3xl font-bold text-primary leading-none" v-text="props.bpmAvg" />
        <span class="text-sm font-medium text-text-secondary" v-text="$t('global_bpm')" />
      </div>

      <div class="flex mb-auto items-center gap-1 text-xs text-text-muted">
        <BaseIcon name="calendar" class="size-4 text-text-muted" />

        {{
          format(props.createdAt, 'MMMM d, yyyy', {
            locale: DATE_FNS_LOCALES_LIST[$i18n.locale as keyof typeof DATE_FNS_LOCALES_LIST],
          })
        }}
        {{
          format(props.createdAt, 'h:mm a', {
            locale: DATE_FNS_LOCALES_LIST[$i18n.locale as keyof typeof DATE_FNS_LOCALES_LIST],
          })
        }}
      </div>
    </div>

    <div v-if="props.measure?.length" class="relative rounded-lg bg-bg-muted p-2">
      <p
        class="absolute top-2 left-2 text-sm font-normal uppercase text-text-muted mb-1.5"
        v-text="$t('measure_detail_graph_title')"
      />

      <MeasureDetailGraph class="mx-auto w-full h-30" :data="props.measure" :border-width="2" />
    </div>
  </div>
</template>
