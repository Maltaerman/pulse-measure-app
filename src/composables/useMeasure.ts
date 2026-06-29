import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { measureApi, type IMeasure } from '@/api'

import { useToast } from './useToast'

export type MeasureZone = 'rest' | 'fat-burn' | 'cardio' | 'peak'

const measureList = ref<IMeasure[]>([])

export function useMeasure() {
  const { t: $t } = useI18n()

  const { toast } = useToast()

  const isLoadingMeasureList = ref(false)

  async function getMeasureList() {
    try {
      isLoadingMeasureList.value = true

      measureList.value = await measureApi.get()
    } catch {
      toast('error', $t('error_measure_fetch'))
    } finally {
      isLoadingMeasureList.value = false
    }
  }

  async function createMeasure(data: IMeasure) {
    try {
      await measureApi.create(data)
    } catch {
      toast('error', $t('error_measure_create'))
    }
  }

  async function deleteMeasure(id: number) {
    try {
      await measureApi.delete(id)
    } catch {
      toast('error', $t('error_measure_delete'))
    }
  }

  return {
    measureList,
    isLoadingMeasureList,
    getMeasureList,
    createMeasure,
    deleteMeasure,
  }
}
