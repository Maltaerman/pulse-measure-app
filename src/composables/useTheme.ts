import { ref } from 'vue'

export const THEME_ENUM = {
  DARK: 'dark',
  LIGHT: 'light',
}

const theme = ref(localStorage.getItem('theme') || THEME_ENUM.LIGHT)

export function useTheme() {
  function setTheme(value: string) {
    theme.value = value

    localStorage.setItem('theme', theme.value)

    document.documentElement.dataset.theme = theme.value
  }

  function toggleTheme() {
    const isDark = theme.value === THEME_ENUM.DARK

    theme.value = isDark ? THEME_ENUM.LIGHT : THEME_ENUM.DARK

    setTheme(theme.value)
  }

  // setTheme(theme.value)

  return {
    theme,
    setTheme,
    toggleTheme,
  }
}
