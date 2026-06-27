import { ref } from 'vue'
import { toast } from 'vue3-toastify'

const BASE_URL = import.meta.env.VITE_BASE_URL

// TODO: review
export interface IMeasure {
  id: string | number
  userId: string
  bpm: number
  createdAt: number
  measure: number[]
  // TODO: new enteties
  duration?: number
  bpmMin?: number
  bpmAvg?: number
  bpmMax?: number
  hrv?: number
  zone?: number
}

async function addItem(data: IMeasure) {
  await fetch(`${BASE_URL}/measures`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

async function deleteItem(id: number) {
  await fetch(`${BASE_URL}/measures/${id}`, { method: 'DELETE' })
}

const measureList = ref<IMeasure[]>([])

export function useMeasure() {
  const isLoadingMeasureList = ref(false)

  async function getMeasureList() {
    try {
      isLoadingMeasureList.value = true

      await fetch(`${BASE_URL}/measures`)
        .then((res) => res.json())
        .then((data) => (measureList.value = data))
    } finally {
      isLoadingMeasureList.value = false
    }
  }

  async function deleteMeasure(id: number) {
    try {
      isLoadingMeasureList.value = true

      await deleteItem(id)

      await getMeasureList()
    } finally {
      isLoadingMeasureList.value = false
    }
  }

  function measureToast(type: 'error' | 'success', message: string) {
    toast(message, { type, autoClose: 3000 })
  }

  return {
    measureList,
    isLoadingMeasureList,
    getMeasureList,

    addMeasure: addItem,
    deleteMeasure,

    measureToast,
  }
}
