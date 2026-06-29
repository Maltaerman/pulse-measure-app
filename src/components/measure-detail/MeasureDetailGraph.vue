<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from 'chart.js'

export interface IProps {
  data: number[]
  borderWidth: number
}

const props = withDefaults(defineProps<IProps>(), {
  data: () => [],
  borderWidth: 4,
})

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale)

const canvasRef = useTemplateRef('canvasRef')

onMounted(() => {
  if (!canvasRef.value) return

  const chart = new Chart(canvasRef.value, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          data: [] as number[],
          borderColor: 'oklch(0.65 0.23 25)',
          borderWidth: props.borderWidth,
          tension: 0,
          pointRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: { display: false },
        y: { display: false },
      },
    },
  })

  let i = 0

  const interval = setInterval(() => {
    if (i >= props.data.length) {
      clearInterval(interval)
      return
    }

    if (!props.data.length) return

    ;(chart.data.labels as number[]).push(i)

    chart.data.datasets[0].data.push(props.data[i])

    chart.update()

    i++
  }, 60)
})
</script>

<template>
  <div class="flex items-center justify-center">
    <canvas ref="canvasRef" class="size-full" />
  </div>
</template>
