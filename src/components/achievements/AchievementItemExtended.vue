<script setup lang="ts">
import { type IAchievementItem } from '@/composables/useAchievements'

import BaseProgressBar from '@/components/bases/BaseProgressBar.vue'

const props = withDefaults(defineProps<IAchievementItem>(), {})
</script>

<template>
  <div
    class="relative flex flex-col gap-2 rounded-sm p-2 shadow-shadow"
    :class="props.status === 'locked' ? 'bg-bg-muted opacity-40' : 'bg-bg-card opac'"
    :c
  >
    <p
      class="text-center text-text-primary text-md font-semibold line-clamp-2"
      v-text="props.title"
    />

    <p class="size-4 mx-auto my-4" v-text="`🫀`" />

    <p class="text-text-secondary text-md font-semibold line-clamp-2" v-text="props.description" />

    <div class="mt-auto flex flex-col gap-1">
      <p class="text-text-secondary text-xs font-light" v-text="props.achievedAt" />

      <BaseProgressBar
        v-if="props.status !== 'locked'"
        :theme="props.progress === 100 ? 'green' : 'violet'"
        :progress="props.progress || 0"
        class="mt-auto"
      />
    </div>
  </div>
</template>
