<script setup lang="ts">
export interface IProps {
  bpm: number
  progress: number
}

const props = withDefaults(defineProps<IProps>(), {})

const emit = defineEmits(['start-measure'])
</script>

<template>
  <div class="relative flex items-center justify-center">
    <div
      class="absolute w-48 h-48 bg-primary/10 rounded-full animate-ping [animation-delay:100ms]"
    />
    <div
      class="absolute w-36 h-36 bg-primary/20 rounded-full animate-ping [animation-delay:500ms]"
    />
    <div
      class="absolute w-28 h-28 bg-primary/30 rounded-full animate-ping [animation-delay:900ms]"
    />

    <button
      v-if="!props.bpm"
      type="button"
      class="relative size-40 animate-heartbeat text-2xl font-bold text-primary uppercase cursor-pointer"
      @click="emit('start-measure')"
    >
      {{ $t('global_start') }}
    </button>

    <div
      v-else
      class="size-40 flex items-center justify-center animate-heartbeat text-2xl font-bold text-primary uppercase"
    >
      <p v-if="props.bpm === 0">Prepearing...</p>

      <p v-else-if="props.bpm">{{ props.progress }}</p>
    </div>
  </div>
</template>
