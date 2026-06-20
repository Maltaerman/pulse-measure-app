<script setup lang="ts">
export interface IProps {
  bpm: number
  isStarted: boolean
}

const props = withDefaults(defineProps<IProps>(), {})

const emit = defineEmits(['measure-start'])
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
      v-if="!props.isStarted"
      type="button"
      class="relative size-40 animate-heartbeat text-2xl font-bold text-primary uppercase cursor-pointer"
      @click="emit('measure-start')"
    >
      {{ $t('global_start') }}
    </button>

    <div
      v-else
      class="size-40 flex items-center justify-center animate-heartbeat text-2xl font-bold text-primary uppercase"
    >
      <p
        v-if="props.isStarted && props.bpm === 0"
        v-text="$t('global_measuring')"
      />

      <template v-else-if="props.bpm">
        {{ props.bpm }}
      </template>
    </div>
  </div>
</template>
