<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  isDisabled: {
    type: Boolean,
    default: false,
  },

  name: {
    type: String,
    default: null,
  },

  id: {
    type: String,
    default: null,
  },

  containerSizeClasses: {
    type: String,
    default: 'w-10 h-5',
  },

  toggleSizeClasses: {
    type: String,
    default: 'size-5',
  },

  transitionClasses: {
    type: String,
    default: 'transition-all duration-300',
  },
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const containerBackgroundColorClasses = computed(() => {
  if (props.isDisabled) return 'bg-bg-disabled'

  return model.value ? 'bg-primary' : 'bg-card'
})

const containerBorderClasses = computed(() => {
  if (props.isDisabled) return 'border-border'

  return 'border-border'
})

const toggleColorClasses = computed(() => {
  if (props.isDisabled) return 'bg-text-secondary border border-transparent'

  return 'bg-light border border-border'
})

const cursorClasses = computed(() => (props.isDisabled ? 'cursor-default' : 'cursor-pointer'))

const containerClasses = computed(() => [
  'relative rounded-full border',
  containerBackgroundColorClasses.value,
  containerBorderClasses.value,
  props.containerSizeClasses,
  props.transitionClasses,
])

const toggleClasses = computed(() => [
  'absolute top-1/2 -translate-y-1/2 rounded-full  mx-px',
  model.value ? 'translate-x-5' : '-translate-x-1',
  toggleColorClasses.value,
  props.toggleSizeClasses,
  props.transitionClasses,
])
</script>

<template>
  <label :class="cursorClasses" :for="props.id">
    <input
      :id="props.id"
      v-model="model"
      class="hidden"
      :disabled="props.isDisabled"
      :name="props.name"
      type="checkbox"
    />

    <div :class="containerClasses">
      <div :class="toggleClasses" />
    </div>
  </label>
</template>
