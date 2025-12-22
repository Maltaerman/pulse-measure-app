import { ref } from 'vue';

export type AchievementStatus = 'locked' | 'unlocked' | 'inProgress';
export interface IAchievementItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  status: AchievementStatus;
  progress?: number
  target?: number;
  achievedAt?: string;
}

const MOCK_ACHIEVEMENTS_LIST: IAchievementItem[] = [
  {
    id: 1,
    title: 'First Pulse',
    description: 'Measure your pulse for the first time.',
    icon: 'colored-google',
    status: 'unlocked',
    progress: 100,
    achievedAt: '2025-01-10'
  },
  {
    id: 2,
    title: 'Daily Check',
    description: 'Measure your pulse once a day.',
    icon: 'colored-google',
    status: 'unlocked',
    progress: 100,
    achievedAt: '2025-01-12'
  },
  {
    id: 3,
    title: 'Consistency Starter',
    description: 'Measure your pulse 3 days in a row.',
    icon: 'colored-google',
    status: 'inProgress',
    progress: 66,
    target: 3
  },
  {
    id: 4,
    title: 'Weekly Habit',
    description: 'Measure your pulse every day for 7 days.',
    icon: 'colored-google',
    status: 'locked',
    progress: 0,
    target: 7
  },
  {
    id: 5,
    title: 'Health Observer',
    description: 'View your pulse history 10 times.',
    icon: 'colored-google',
    status: 'inProgress',
    progress: 40,
    target: 10
  },
  {
    id: 6,
    title: 'Calm Heart',
    description: 'Record a resting pulse under 60 bpm.',
    icon: 'colored-google',
    status: 'locked'
  },
  {
    id: 7,
    title: 'Active Session',
    description: 'Measure pulse after physical activity.',
    icon: 'colored-google',
    status: 'unlocked',
    progress: 100,
    achievedAt: '2025-01-15'
  },
  {
    id: 8,
    title: 'Data Collector',
    description: 'Save 50 pulse measurements.',
    icon: 'colored-google',
    status: 'inProgress',
    progress: 22,
    target: 50
  },
  {
    id: 9,
    title: 'Monthly Commitment',
    description: 'Measure your pulse for 30 days total.',
    icon: 'colored-google',
    status: 'locked',
    target: 30
  },
  {
    id: 10,
    title: 'Heart Master',
    description: 'Unlock all other achievements.',
    icon: 'colored-google',
    status: 'locked'
  }
];

const achievementsList = ref<IAchievementItem[]>([]);

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
