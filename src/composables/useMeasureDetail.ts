import { computed } from 'vue'
import type { ComputedRef } from 'vue'

import type { IMeasure } from '@/api'

export type MeasureZone = 'rest' | 'fat-burn' | 'cardio' | 'peak'

export interface IMeasureDetail extends IMeasure {
  bpmMin: number
  bpmAvg: number
  bpmMax: number
  hrv: number
  zone: MeasureZone
  duration: number
}

export type MeasureStats = {
  [K in keyof Omit<IMeasureDetail, keyof IMeasure>]: ComputedRef<IMeasureDetail[K]>
}

const ZONE_ENUM = {
  REST: 'rest',
  FAT_BURN: 'fat-burn',
  CARDIO: 'cardio',
  PEAK: 'peak',
} as const

const ZONE_VALUES: Record<MeasureZone, number> = {
  [ZONE_ENUM.REST]: 60,
  [ZONE_ENUM.FAT_BURN]: 70,
  [ZONE_ENUM.CARDIO]: 85,
  [ZONE_ENUM.PEAK]: Infinity,
}

export function useMeasureDetail(masureDetail: ComputedRef<IMeasure>): MeasureStats {
  const samples = computed(() => masureDetail.value?.measure ?? [])

  const duration = computed(() => samples.value.length)

  const bpmMin = computed(() => (samples.value.length ? Math.min(...samples.value) : 0))

  const bpmMax = computed(() => (samples.value.length ? Math.max(...samples.value) : 0))

  const bpmAvg = computed(() => {
    if (!samples.value.length) return 0

    const sum = samples.value.reduce((acc, v) => acc + v, 0)

    return Math.round(sum / samples.value.length)
  })

  const hrv = computed(() => {
    if (samples.value.length < 2) return 0

    const squaredDiffs = samples.value.slice(1).map((val, i) => Math.pow(val - samples.value[i], 2))

    const mean = squaredDiffs.reduce((sum, v) => sum + v, 0) / squaredDiffs.length

    return Math.round(Math.sqrt(mean))
  })

  const zone = computed(() => {
    if (bpmAvg.value < ZONE_VALUES.rest) return ZONE_ENUM.REST
    if (bpmAvg.value < ZONE_VALUES['fat-burn']) return ZONE_ENUM.FAT_BURN
    if (bpmAvg.value < ZONE_VALUES.cardio) return ZONE_ENUM.CARDIO

    return ZONE_ENUM.PEAK
  })

  return {
    duration,
    bpmMin,
    bpmAvg,
    bpmMax,
    hrv,
    zone,
  }
}
