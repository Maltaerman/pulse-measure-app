import { computed } from 'vue';

const TITLES = [
  "Let’s check your pulse",
  "Take a moment to measure your pulse",
  "Check your pulse to track your heart health",
  "Measure your pulse now",
  "Keep an eye on your pulse",
  "Check your pulse for better health",
  "Monitor your pulse in real time",
  "Stay aware of your heart rate",
  "Track your pulse effortlessly",
  "See your pulse in seconds"
];

export function useRandomTitle() {
  const randomTitle = computed(() => TITLES[Math.floor(Math.random() * TITLES.length)]);

  return { randomTitle };
}
