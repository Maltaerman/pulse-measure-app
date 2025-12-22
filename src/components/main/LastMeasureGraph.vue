<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },

  chartOptions: {
    type: Object,
    default: () => ({})
  }
})

const chartRef = ref(null)
let chartInstance = null;

onMounted(() => {
  if (chartRef.value) {
    chartInstance = new Chart(chartRef.value, {
      type: 'line',
      // data: props.chartData,
      data: {
        datasets: [{
          data: [20, 10,2, 22, 1, 14,60],
        }],
        labels: ['1', '2', '3', '4', '5'],
      },
      options: props.chartOptions
    })
  }
})

// Watch for chartData updates
watch(
  () => props.chartData,
  (newData) => {
    console.log('props.chartData', props.chartData)

    if (chartInstance) {
      chartInstance.data = newData
      chartInstance.update()
    }
  },
  { deep: true }
)
</script>

<template>
  <div class="flex flex-col gap-4 bg-neutral-200 rounded-sm p-2">
    Last measure graph

    <canvas ref="chartRef" />
  </div>
</template>