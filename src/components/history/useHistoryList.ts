import { ref } from 'vue';

export interface IHistoryListItem {
  id: string;
  value: number;
}

const MOCK_HISTORY_LIST: IHistoryListItem[] = [
  { id: '1', value: 80  },
  { id: '2', value: 79  },
  { id: '3', value: 85  },
  { id: '4', value: 76  },
];

const historyList = ref<IHistoryListItem[]>([]);

export function useHistoryList() {

  const isLoadingHistoryList = ref(false);

  function getHistoryList() {
    try {
      isLoadingHistoryList.value = true;

      historyList.value = [ ...MOCK_HISTORY_LIST ];

    } finally {
      isLoadingHistoryList.value = false;
    }
  }

  function resetHistoryList() {
    try {
      isLoadingHistoryList.value = true;

      historyList.value = [];

    } finally {
      isLoadingHistoryList.value = false;
    }
  }

  return {
    historyList,
    isLoadingHistoryList,
    getHistoryList,
    resetHistoryList,
  };
}
