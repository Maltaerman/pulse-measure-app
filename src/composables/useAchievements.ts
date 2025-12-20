import { ref } from 'vue';

export interface IAchievementsListItem {
  id: string;
  value: number;
  status: 'completed';
}

const MOCK_ACHIEVEMENTS_LIST: IAchievementsListItem[] = [
  { id: '1', value: 80, status: 'completed'  },
  { id: '2', value: 79, status: 'completed'  },
  { id: '3', value: 85, status: 'completed'  },
  { id: '4', value: 76, status: 'completed'  },
];

const achievementsList = ref<IAchievementsListItem[]>([]);

export function useAchievements() {

  const isLoadingAchievementsList = ref(false);

  function getAchievementsList() {
    try {
      isLoadingAchievementsList.value = true;

      achievementsList.value = [ ...MOCK_ACHIEVEMENTS_LIST ];

    } finally {
      isLoadingAchievementsList.value = false;
    }
  }

  return {
    achievementsList,
    isLoadingAchievementsList,
    getAchievementsList,
  };
}
