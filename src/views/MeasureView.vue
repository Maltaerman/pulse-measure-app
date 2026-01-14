<script setup lang="ts">
import { useTemplateRef, ref, onMounted } from "vue";

import { useCamera } from '@/composables/useCamera';
import { useBPM } from '@/composables/useBPM';

const videoRef = useTemplateRef('videoRef');
const canvasRef = useTemplateRef('canvasRef');

const ctx = ref(null);

function getContext() {
  ctx.value = canvasRef.value.getContext('2d');
}

onMounted(getContext)

const { isTorchAvailable, avgR, isManualTorchOn, enableManualTorch } = useCamera(videoRef, canvasRef, ctx);
const { bpm } = useBPM();
</script>

<template>
  <!-- <button
    v-if="!isTorchAvailable && !isManualTorchOn"
    @click="enableManualTorch"
    class="bg-yellow-500 text-white px-4 py-2 rounded-xl mt-4"
  >
    💡Ligthning
  </button> -->

  <div class="flex flex-col gap-4 size-full --screenMinHeight items-center justify-center">
    <video
      ref="videoRef"
      autoplay
      playsinline
      class="hidden rounded-xl shadow-md mx-auto"
    /> 

    <canvas ref="canvasRef" width="320" height="240" class="hidden" />


    <div class="flex flex-col gap-2 font-semibold text-lg text-primary-600 text-center">
      <p v-if="bpm">
        BPM:{{ bpm }}
      </p>

      <p v-if="avgR">
        R: {{ avgR.toFixed(2) }}
      </p>
    </div>
  </div>
</template>