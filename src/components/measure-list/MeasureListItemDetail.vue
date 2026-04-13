<script setup lang="ts">
import { useRouter } from 'vue-router'
import { PAGE_NAME_ENUM } from '@/router'

import { useMeasure } from '@/composables/useMeasure'

import BaseLabel from '@/components/bases/BaseLabel.vue'
import BaseButton from '@/components/bases/BaseButton.vue'
import MeasureDetailGraph from '@/components/measure-detail/MeasureDetailGraph.vue'

import { usePopupManager } from '@/components/popups/usePopupManager'
import { POPUP_NAME_ENUM } from '@/components/popups/types'

export interface IProps {
  id: number
  bpm: number
  measure?: number[]
}

const props = withDefaults(defineProps<IProps>(), {
  measure: () => [],
})

const router = useRouter()
const { openPopup, closePopup } = usePopupManager()
const { deleteMeasure } = useMeasure()

function deleteButtonHandler() {
  function callback() {
    try {
      deleteMeasure(props.id)
    } finally {
      closePopup()

      router.push({ name: PAGE_NAME_ENUM.MEASURE_LIST })
    }
  }

  openPopup({
    component: POPUP_NAME_ENUM.CONFIRMATION,
    data: {
      title: 'popup_confirmation_title',
      subtitle: 'popup_confirmation_subtitle',
      submitButton: 'popup_confirmation_submit',
      cancelButton: 'popup_confirmation_cancel',
      callback,
    },
  })
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="rounded-lg p-4 bg-bg-card shadow-md border border-border flex flex-col gap-4">
      <div class="flex items-end gap-2">
        <p class="text-5xl font-bold text-primary" v-text="props.bpm" />

        <p class="text-lg text-text-secondary mb-1" v-text="'bpm'" />
      </div>

      <div class="flex items-center gap-2">
        <BaseLabel theme="secondary">Normal</BaseLabel>

        <span class="text-sm text-text-secondary" v-text="'60–100 bpm'" />
      </div>

      <MeasureDetailGraph class="w-full h-40" :data="props.measure" />
    </div>

    <button
      class="w-full p-4 rounded-lg bg-bg-card border border-border text-left text-text-primary"
    >
      {{ $t('measure_detail_note') }}
    </button>

    <button
      class="w-full p-4 rounded-lg bg-bg-card border border-border text-left text-text-primary"
    >
      {{ $t('measure_detail_share') }}
    </button>

    <BaseButton class="capitalize" size="lg" @click="deleteButtonHandler">
      {{ $t('measure_detail_delete') }}
    </BaseButton>
  </div>
</template>
