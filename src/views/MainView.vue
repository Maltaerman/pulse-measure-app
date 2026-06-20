<script setup lang="ts">
import {
  defineAsyncComponent,
  useTemplateRef,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
} from 'vue'
// import { PAGE_NAME_ENUM } from '@/router'

import { useCamera } from '@/composables'
import { useBPM } from '@/composables'

import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import 'vue3-toastify/dist/index.css'

import MainMeasureInfo from '@/components/main/MainMeasureInfo.vue'
import MainMeasureHIWButton from '@/components/main/MainMeasureHIWButton.vue'

// import BaseCircleProgressBar from '@/components/base/BaseCircleProgressBar.vue'
// import LastMeasure from '@/components/main/LastMeasure.vue'

import { useDevice } from '@/composables'

import { useMeasure } from '@/composables'
import { useUser } from '@/composables'

const MainLastMeasure = defineAsyncComponent(() => import('@/components/main/MainLastMeasure.vue'))

const { t: $t } = useI18n()
const { isDesktop } = useDevice()
const { addMeasure, measureList, getMeasureList } = useMeasure()
const { userId } = useUser()

getMeasureList()

const videoRef = useTemplateRef('videoRef')
const canvasRef = useTemplateRef('canvasRef')

const ctx = ref<CanvasRenderingContext2D | null>(null)

function getContext() {
  if (canvasRef.value) ctx.value = canvasRef.value.getContext('2d')
}

function resetContext() {
  ctx.value = null
}

onMounted(getContext)

useCamera(videoRef, canvasRef, ctx)
const { bpm } = useBPM()

const measureProgress = ref(0)
const isStarted = ref(false)

const lastMeasureData = computed(() => measureList.value[0])

const intervalId = ref(0)

const localMeasureData = ref([])

function intervalHandler() {
  measureProgress.value += 10

  if (measureProgress.value === 100 && bpm.value === 0) {
    measureProgress.value = 0
  }

  if (bpm.value !== 0) {
    localMeasureData.value.push(bpm.value as never)
  }
}

function start() {
  if (isDesktop.value) {
    toast($t('measure_error_device'), {
      type: 'error',
      autoClose: 3000,
    })

    return
  }

  isStarted.value = true

  intervalId.value = setInterval(intervalHandler, 1000)

  if (bpm.value > 0) isStarted.value = false
}

onBeforeUnmount(async () => {
  if (!isStarted.value) return

  if (intervalId.value) clearInterval(intervalId.value)

  await addMeasure({
    id: `${Date.now()}`,
    userId: userId.value,
    createdAt: Date.now(),
    bpm: 0,
    measure: localMeasureData.value,
  })

  await getMeasureList()

  isStarted.value = false
  measureProgress.value = 0
  resetContext()
})
</script>

<template>
  <section class="relative flex-1 flex flex-col items-center justify-center">
    <MainMeasureHIWButton class="absolute left-2 top-2 z-10" />

    <video ref="videoRef" autoplay playsinline class="hidden" />

    <canvas ref="canvasRef" width="100" height="100" class="hidden" />

    <MainMeasureInfo v-bind="{ bpm, isStarted }" @measure-start="start" />

    <Transition mode="out-in" name="transition-slide-bottom">
      <MainLastMeasure
        v-if="lastMeasureData"
        v-bind="{ ...lastMeasureData, id: Number(lastMeasureData.id) }"
        class="w-[calc(100%-16px)] absolute bottom-2"
      />
    </Transition>
  </section>
</template>
