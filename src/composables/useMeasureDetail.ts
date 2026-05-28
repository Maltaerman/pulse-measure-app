import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import type { IMeasure } from './useMeasure'

export type MeasureZone = 'rest' | 'fat-burn' | 'cardio' | 'peak'

export interface IMeasureStats {
  duration: ComputedRef<number>
  bpmMin: ComputedRef<number>
  bpmAvg: ComputedRef<number>
  bpmMax: ComputedRef<number>
  hrv: ComputedRef<number>
  zone: ComputedRef<MeasureZone>
}

const ZONE_ENUM = {
  REST: 60,
  FAT_BURN: 70,
  CARDIO: 85,
}

function getZone(bpm: number): MeasureZone {
  if (bpm < ZONE_ENUM.REST) return 'rest'
  if (bpm < ZONE_ENUM.FAT_BURN) return 'fat-burn'
  if (bpm < ZONE_ENUM.CARDIO) return 'cardio'

  return 'peak'
}

function calcHrv(samples: number[]): number {
  if (samples.length < 2) return 0

  const squaredDiffs = samples.slice(1).map((val, i) => Math.pow(val - samples[i], 2))

  const mean = squaredDiffs.reduce((sum, v) => sum + v, 0) / squaredDiffs.length
  return Math.round(Math.sqrt(mean))
}

export function useMeasureDetail(masureDetail: ComputedRef<IMeasure>): IMeasureStats {
  const samples = computed(() => masureDetail.value?.measure ?? [])

  const duration = computed(() => samples.value.length)

  const bpmMin = computed(() => (samples.value.length ? Math.min(...samples.value) : 0))

  const bpmMax = computed(() => (samples.value.length ? Math.max(...samples.value) : 0))

  const bpmAvg = computed(() => {
    if (!samples.value.length) return 0
    const sum = samples.value.reduce((acc, v) => acc + v, 0)
    return Math.round(sum / samples.value.length)
  })

  const hrv = computed(() => calcHrv(samples.value))

  const zone = computed(() => getZone(bpmAvg.value))

  return {
    duration,
    bpmMin,
    bpmAvg,
    bpmMax,
    hrv,
    zone,
  }
}
