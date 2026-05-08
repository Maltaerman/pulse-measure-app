import { ref } from 'vue'

export type AchievementStatus = 'locked' | 'unlocked' | 'inProgress'
export interface IAchievementItem {
  id: number
  title: string
  description: string
  icon: string
  status: AchievementStatus
  progress?: number
  target?: number
  achievedAt?: string
}

const achievementsList = ref<IAchievementItem[]>([])

export function useAchievements() {
  const isLoadingAchievementsList = ref(false)

  function getAchievementsList() {
    try {
      isLoadingAchievementsList.value = true

      achievementsList.value = []
    } finally {
      isLoadingAchievementsList.value = false
    }
  }

  return {
    achievementsList,
    isLoadingAchievementsList,
    getAchievementsList,
  }
}
