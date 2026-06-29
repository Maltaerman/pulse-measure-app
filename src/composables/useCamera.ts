import { ref, onMounted, onUnmounted, type Ref } from 'vue'

import { useBPM } from './useBPM'

const VIDEO_PRESET = {
  facingMode: { ideal: 'environment' },
  width: { ideal: 640 },
  height: { ideal: 480 },
}

const MEDIA_PRESET = { video: VIDEO_PRESET }

let stream: MediaStream | null = null
let intervalId: ReturnType<typeof setInterval> | null = null

const isTorchAvailable = ref(false)

const avgR = ref(0)

const signal: number[] = []
const timestamps: number[] = []

export function useCamera(
  video: Ref<HTMLVideoElement | null>,
  canvas: Ref<HTMLCanvasElement | null>,
  ctx: Ref<CanvasRenderingContext2D | null>,
) {
  const { setBPM } = useBPM()

  function processFrame() {
    if (!video.value || !canvas.value || !ctx.value) return

    const CTX_CONFIG = [0, 0, canvas.value.width, canvas.value.height] as const

    ctx.value.drawImage(video.value, ...CTX_CONFIG)
    const frame = ctx.value.getImageData(...CTX_CONFIG)

    let sum = 0
    for (let i = 0; i < frame.data.length; i += 4) {
      sum += frame.data[i]
    }

    const avg = sum / (frame.data.length / 4)
    avgR.value = avg

    const now = performance.now() / 1000

    signal.push(avg)
    timestamps.push(now)

    const cutoff = now - 10
    while (timestamps.length && timestamps[0] < cutoff) {
      timestamps.shift()
      signal.shift()
    }

    if (signal.length > 20) setBPM(signal, timestamps)
  }

  async function init() {
    try {
      stream = await navigator.mediaDevices.getUserMedia(MEDIA_PRESET)

      if (!video.value) return

      video.value.srcObject = stream

      await new Promise((r) => (video.value!.onloadedmetadata = r))

      const track = stream.getVideoTracks()[0]
      const capabilities = track.getCapabilities()

      if ('torch' in capabilities) {
        isTorchAvailable.value = true

        // cast to any to allow the non-standard 'torch' constraint
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await track.applyConstraints({ advanced: [{ torch: true }] } as any)
      }

      intervalId = setInterval(processFrame, 50)
    } catch (err) {
      console.error(err)
    }
  }

  function deinit() {
    if (!intervalId) return

    clearInterval(intervalId)

    stream?.getTracks().forEach((t) => t.stop())
  }

  onMounted(init)
  onUnmounted(deinit)

  return {
    avgR,
    isTorchAvailable,
  }
}
