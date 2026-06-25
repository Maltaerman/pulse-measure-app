<script setup lang="ts">
import {
  defineAsyncComponent,
  useTemplateRef,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
} from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { PAGE_NAME_ENUM } from '@/router'

import { useDevice, useCamera, useBPM, useMeasure, useUser } from '@/composables'

import MainMeasureInfo from '@/components/main/MainMeasureInfo.vue'
import MainMeasureHIWButton from '@/components/main/MainMeasureHIWButton.vue'

const MainLastMeasure = defineAsyncComponent(() => import('@/components/main/MainLastMeasure.vue'))

const videoRef = useTemplateRef('videoRef')
const canvasRef = useTemplateRef('canvasRef')

const MEASURE_DURATION = 30
const measureProgress = ref(MEASURE_DURATION);

const canvasContex = ref<CanvasRenderingContext2D | null>(null)

useCamera(videoRef, canvasRef, canvasContex)

const router = useRouter()
const { t: $t } = useI18n()
const { isDesktop } = useDevice()

const { userId } = useUser()

const { bpm } = useBPM()
const { addMeasure, measureList, getMeasureList, measureToast } = useMeasure()

getMeasureList()

const lastMeasureData = computed(() => measureList.value[measureList.value.length - 1])

const intervalId = ref(0)

async function onMeasureTick(measureData: number[]) {
  try {
    if (bpm.value) {
      measureProgress.value -= 1

      measureData.push(bpm.value)
    }

    if (measureProgress.value === 0) {
      clearInterval(intervalId.value)

      await addMeasure({
        id: `${Date.now()}`,
        userId: userId.value,
        createdAt: Date.now(),
        bpm: 0,
        measure: measureData,
      })

      router
        .push({ name: PAGE_NAME_ENUM.MEASURE_LIST })
        .then(() => measureToast('success', $t('measure_success')))
    }
  } catch {
    measureToast('error', $t('measure_error'))

    measureProgress.value = MEASURE_DURATION
  }
}

function startMeasure() {
  if (isDesktop.value) {
    measureToast('error', $t('measure_error_device'))
  } else {
    const measureData: number[] = []
    const intervalCb = () => onMeasureTick(measureData)

    intervalId.value = setInterval(intervalCb, 1000)
  }
}

function getContext() {
  if (canvasRef.value) {
    canvasContex.value = canvasRef.value.getContext('2d')
  }
}

function resetContext() {
  canvasContex.value = null
}

onMounted(getContext)
onBeforeUnmount(resetContext)
</script>

<template>
  <section class="relative flex-1 flex flex-col items-center justify-center">
    <MainMeasureHIWButton class="absolute left-2 top-2 z-10" />

    <video ref="videoRef" autoplay playsinline class="hidden" />

    <canvas ref="canvasRef" width="100" height="100" class="hidden" />

    <MainMeasureInfo v-bind="{ bpm, progress: measureProgress }" @start-measure="startMeasure" />

    <Transition mode="out-in" name="transition-slide-bottom">
      <MainLastMeasure
        v-if="lastMeasureData"
        v-bind="{ ...lastMeasureData, id: Number(lastMeasureData.id) }"
        class="w-full absolute bottom-2"
      />
    </Transition>
  </section>
</template>
