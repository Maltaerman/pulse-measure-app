<script setup lang="ts">
import { useAchievements } from '@/composables/useAchievements'

const { getAchievementsList } = useAchievements()

getAchievementsList()
</script>

<template>
  <section>In development</section>
</template>
