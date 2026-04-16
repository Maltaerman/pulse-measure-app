import { ref } from 'vue'

const BASE_URL = import.meta.env.VITE_BASE_URL

export interface IMeasure {
  id: string
  userId: string
  bpm: number
  createdAt: number
  measure: number[]
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

  return {
    measureList,
    isLoadingMeasureList,
    getMeasureList,

    addMeasure: addItem,
    deleteMeasure,
  }
}
