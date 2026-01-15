<script setup lang="ts">
import { useTemplateRef, ref, onMounted, onBeforeUnmount } from "vue";

import { useCamera } from '@/composables/useCamera';
import { useBPM } from '@/composables/useBPM';

import BaseCircleProgressBar from '@/components/bases/BaseCircleProgressBar.vue';

const videoRef = useTemplateRef('videoRef');
const canvasRef = useTemplateRef('canvasRef');

const ctx = ref(null);

function getContext() {
  ctx.value = canvasRef.value.getContext('2d');
}

onMounted(getContext)

const { avgR } = useCamera(videoRef, canvasRef, ctx);
const { bpm } = useBPM();

const measureProgress = ref(0);
const isStarted = ref(false);

const intervalId = ref(0);


function intervalHandler() {
  if (bpm.value > 0) {
    measureProgress.value = 100;

    return;
  }

   measureProgress.value += 10;

  if (measureProgress.value === 100 && bpm.value === 0) {
    measureProgress.value = 0;
  }
}

async function start() {
  isStarted.value = true;

  intervalId.value = await setInterval(intervalHandler, 1000);

  if (bpm.value > 0) isStarted.value = false;
}

onBeforeUnmount(() => {
  if (intervalId.value) clearInterval(intervalId.value)
});
</script>

<template>
  <!-- <button
    v-if="!isTorchAvailable && !isManualTorchOn"
    @click="enableManualTorch"
    class="bg-yellow-500 text-white px-4 py-2 rounded-xl mt-4"
  >
    💡Ligthning
  </button> -->

  <div class="m-auto">
    <video
      ref="videoRef"
      autoplay
      playsinline
      class="hidden rounded-xl shadow-md mx-auto"
    /> 

    <canvas ref="canvasRef" width="320" height="240" class="hidden" />
    

    <BaseCircleProgressBar
      class="size-50"
      theme="blue"
      :progress="measureProgress"
    >
      <div class="flex flex-col gap-2 font-semibold text-lg text-center transition-colors duration-300
        text-light bg-primary-500 uppercase rounded-full
      ">
        <button
          v-if="!isStarted"
          class="size-40 uppercase"
          type="button"
          @click="start"
        >
          Start
        </button>

        <div
          v-else
          class="size-40 flex items-center justify-center"
         
        >
          <p
            v-if="isStarted && bpm === 0"
            v-text="'Measuring...'"
          />

          <template v-else-if="bpm">
            BPM:{{ bpm }} <br>
            R: {{ avgR.toFixed(2) }}
          </template>
        </div>
      </div>
    </BaseCircleProgressBar>
  </div>
</template>