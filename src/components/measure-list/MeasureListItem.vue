<script setup lang="ts">
import { format } from 'date-fns'
import { PAGE_NAME_ENUM } from '@/router'

import BaseIcon from '@/components/base/BaseIcon.vue'
import MeasureDetailGraph from '@/components/measure-detail/MeasureDetailGraph.vue'
import { POPUP_NAME_ENUM, CONFIRMATION_POPUP_DATA_PRESET } from '@/components/popups'

import { usePopupManager } from '@/composables'
import { useMeasure } from '@/composables'

export interface IProps {
  id: number
  userId: string
  bpm: number
  createdAt: number
  measure: number[]
}

const props = withDefaults(defineProps<IProps>(), {
  bpm: 0,
  createdAt: 0,
})

const { openPopup, closePopup } = usePopupManager()
const { deleteMeasure } = useMeasure()

function deleteButtonHandler() {
  function callback() {
    try {
      deleteMeasure(props.id)
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
          v-text="format(props.createdAt, 'HH:MM')"
        />

        <p
          class="text-text-muted text-xs transition-colors duration-300"
          v-text="`${props.bpm} ${$t('global_bpm')}`"
        />
      </div>
    </div>

    <MeasureDetailGraph class="max-w-40 w-fit h-9" :data="props.measure" :borderWidth="1" />

    <div class="flex items-center gap-2">
      <span class="text-text-primary font-semibold text-lg" v-text="$attrs.bpm" />

      <button type="button" class="cursor-pointer" @click.stop="deleteButtonHandler">
        <BaseIcon class="size-4 text-danger" name="bin" />
      </button>

      <BaseIcon class="size-4 -rotate-90 text-text-primary" name="arrow" />
    </div>
  </div>
</template>
