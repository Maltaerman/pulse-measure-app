import { ref } from 'vue';

export interface IMeasure {
  id: string;
  userId?: string;
  bpm: number;
  timestamp: number;
  durationMs: number;
  isValid: boolean;
  confidence?: number;
  signalQuality?: "low" | "medium" | "high";
  rrIntervalsMs?: number[];
  rawSignal?: number[];
  tag?: "resting" | "active" | "recovery" | "peak";
  createdAt: number;
}

const MOCK_HISTORY_LIST: IMeasure[] = [
  {
    id: '1',
    userId: '1',
    bpm: 20,
    timestamp: 1000,
    durationMs: 1000,
    isValid: true,
    confidence: 1,
    signalQuality: 'medium',
    rrIntervalsMs: [],
    rawSignal: [],
    tag: 'active',
    createdAt: 1766582890608,
  },
    {
    id: '2',
    userId: '2',
    bpm: 30,
    timestamp: 1000,
    durationMs: 1000,
    isValid: true,
    confidence: 1,
    signalQuality: 'medium',
    rrIntervalsMs: [],
    rawSignal: [],
    tag: 'active',
    createdAt: 1766582890608,
  },
];

const measureList = ref<IMeasure[]>([]);

export function useMeasure() {

  const isLoadingMeasureList = ref(false);

  function getMeasureList() {
    try {
      isLoadingMeasureList.value = true;

      measureList.value = [ ...MOCK_HISTORY_LIST ];

    } finally {
      isLoadingMeasureList.value = false;
    }
  }

  function resetMeasureList() {
    try {
      isLoadingMeasureList.value = true;

      measureList.value = [];

    } finally {
      isLoadingMeasureList.value = false;
    }
  }

  return {
    measureList,
    isLoadingMeasureList,
    getMeasureList,
    resetMeasureList,
  };
}
