<script setup lang="ts">
import { computed } from 'vue'
import { format } from 'date-fns'

import { PAGE_NAME_ENUM } from '@/router'

import BaseIcon from '@/components/base/BaseIcon.vue'
import MeasureDetailGraph from '@/components/measure-detail/MeasureDetailGraph.vue'
import { POPUP_NAME_ENUM, CONFIRMATION_POPUP_DATA_PRESET } from '@/components/popups'

import { usePopupManager, useMeasure, useMeasureDetail } from '@/composables'

export interface IProps {
  id: number
  userId: string
  createdAt: number
  measure: number[]
}

const props = withDefaults(defineProps<IProps>(), {})

const measureData = computed(() => ({
  id: props.id,
  userId: props.userId,
  createdAt: props.createdAt,
  measure: props.measure,
}))

const { bpmAvg } = useMeasureDetail(measureData)

const { openPopup, closePopup } = usePopupManager()
const { deleteMeasure, getMeasureList } = useMeasure()

function deleteButtonHandler() {
  async function callback() {
    try {
      await deleteMeasure(props.id)

      await getMeasureList()
    } finally {
      closePopup()
    }
  }

  openPopup({
    component: POPUP_NAME_ENUM.CONFIRMATION,
    data: { ...CONFIRMATION_POPUP_DATA_PRESET, callback },
  })
}
</script>

<template>
  <div
    class="cursor-pointer flex items-center justify-between gap-4 bg-card border border-border bg-bg-card rounded-lg px-4 py-3 hover:bg-bg-muted transition-colors duration-300"
    @click="
      $router.push({
        name: PAGE_NAME_ENUM.MEASURE_ITEM,
        params: { id: props.id },
      })
    "
  >
    <div class="flex items-center gap-3">
      <BaseIcon class="size-6 text-primary" name="heart" />

      <div class="flex flex-col">
        <p
          class="text-text-secondary text-sm font-bold transition-colors duration-300"
          v-text="format(props.createdAt, 'HH:m')"
        />

        <p
          class="text-text-muted text-xs transition-colors duration-300"
          v-text="`${bpmAvg} ${$t('global_bpm')}`"
        />
      </div>
    </div>

    <MeasureDetailGraph class="max-w-40 w-fit h-9" :data="props.measure" :borderWidth="1" />

    <div class="flex items-center gap-2">
      <button type="button" class="cursor-pointer" @click.stop="deleteButtonHandler">
        <BaseIcon class="size-4 text-danger" name="bin" />
      </button>

      <BaseIcon class="size-4 -rotate-90 text-text-primary" name="arrow" />
    </div>
  </div>
</template>
