import { ref } from 'vue';

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
  id: string;
  bpm: number;
  createdAt: number;
  measure: number[];
}

const MOCK_HISTORY_LIST: IMeasure[] = [
  //   {
  //   id: '2',
  //   userId: '2',
  //   bpm: 30,
  //   timestamp: 1000,
  //   durationMs: 1000,
  //   isValid: true,
  //   confidence: 1,
  //   signalQuality: 'medium',
  //   rrIntervalsMs: [],
  //   rawSignal: [],
  //   tag: 'active',
  //   createdAt: 1766582890608,
  // },
  {
    id: '1',
    createdAt: 1766582890608,
    bpm: 0,
    measure: [],
  },
    {
    id: '2',
    createdAt: 1766589890608,
    bpm: 0,
    measure: [],
  }
];

function addMeasure(data) {
  measureList.value = [...measureList.value, data];
}

const measureList = ref<IMeasure[]>([]);

export function useMeasure() {

  const isLoadingMeasureList = ref(false);

  function getMeasureList() {
    try {
      isLoadingMeasureList.value = true;

      if (!measureList.value.length) measureList.value = [ ...MOCK_HISTORY_LIST ];

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

    addMeasure,
  };
}
