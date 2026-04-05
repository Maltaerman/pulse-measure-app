import { ref } from 'vue'

// const BASE_URL = 'http://localhost:3001'
const BASE_URL = 'https://pulse-measure.onrender.com'
export interface IMeasure {
  // id: string;
  // userId?: string;
  // bpm: number;
  // timestamp: number;
  // durationMs: number;
  // isValid: boolean;
  // confidence?: number;
  // signalQuality?: "low" | "medium" | "high";
  // rrIntervalsMs?: number[];
  // rawSignal?: number[];
  // tag?: "resting" | "active" | "recovery" | "peak";
  // createdAt: number;
  id: string
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
