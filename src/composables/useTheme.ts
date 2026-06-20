import { ref, computed } from 'vue'

const LOCAL_STORAGE_THEME_KEY = 'theme'

export const THEME_ENUM = {
  LIGHT: 'light',
  DARK: 'dark',
}

const theme = ref(localStorage.getItem(LOCAL_STORAGE_THEME_KEY) || THEME_ENUM.LIGHT)

export function useTheme() {
  const isLight = computed(() => theme.value === THEME_ENUM.LIGHT)
  const isDark = computed(() => theme.value === THEME_ENUM.DARK)

  function setTheme(value: string) {
    theme.value = value

    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme.value)

    document.documentElement.dataset.theme = theme.value
  }

  function toggleTheme() {
    setTheme(isDark.value ? THEME_ENUM.LIGHT : THEME_ENUM.DARK)
  }

  return {
    theme,
    isLight,
    isDark,
    setTheme,
    toggleTheme,
  }
}
