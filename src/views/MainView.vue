<script setup lang="ts">
import {
  defineAsyncComponent,
  useTemplateRef,
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
} from 'vue'
import { PAGE_NAME_ENUM } from '@/router'

import { useCamera } from '@/composables/useCamera'
import { useBPM } from '@/composables/useBPM'

import { toast } from 'vue3-toastify'
import { useI18n } from 'vue-i18n'
import 'vue3-toastify/dist/index.css'

// import BaseCircleProgressBar from '@/components/bases/BaseCircleProgressBar.vue'
// import LastMeasure from '@/components/main/LastMeasure.vue'

import { useDevice } from '@/composables/useDevice'

import { useMeasure } from '@/composables/useMeasure'
import { useUser } from '@/composables/useUser'

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

const { avgR } = useCamera(videoRef, canvasRef, ctx)
const { bpm } = useBPM()

const measureProgress = ref(0)
const isStarted = ref(false)

const lastMeasureData = computed(() => measureList.value[0])

const intervalId = ref(0)

const localMeasureData = ref([])

function intervalHandler() {
  console.log('intervalHandler', measureProgress.value)

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

    <canvas ref="canvasRef" width="320" height="240" class="hidden" />

    <div class="relative flex flisMoex-col items-center justify-center">
      <div
        class="absolute w-48 h-48 bg-primary/10 rounded-full animate-ping [animation-delay:100ms]"
      />
      <div
        class="absolute w-36 h-36 bg-primary/20 rounded-full animate-ping [animation-delay:500ms]"
      />
      <div
        class="absolute w-28 h-28 bg-primary/30 rounded-full animate-ping [animation-delay:900ms]"
      />

      <button
        v-if="!isStarted"
        type="button"
        class="relative size-40 animate-heartbeat text-2xl font-bold text-primary uppercase cursor-pointer"
        @click="start"
      >
        {{ $t('global_start') }}
      </button>

      <div
        v-else
        class="size-40 flex items-center justify-center animate-heartbeat text-2xl font-bold text-primary uppercase"
      >
        <p v-if="isStarted && bpm === 0" v-text="$t('global_measuring')" />

        <template v-else-if="bpm">
          {{ bpm }}
        </template>
      </div>
    </div>

    <Transition mode="out-in" name="transition-slide-bottom">
      <MainLastMeasure
        v-if="lastMeasureData"
        v-bind="{ ...lastMeasureData, id: Number(lastMeasureData.id) }"
        class="w-[calc(100%-16px)] absolute bottom-2"
      />
    </Transition>
  </section>
</template>
