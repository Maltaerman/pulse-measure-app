<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue';

import BaseValidationErrors, { type IError } from './BaseValidationErrors.vue';

export interface IProps {
  modelValue: string | number;
  type?: 'text';
  autocomplete?: 'off';
  name?: string;
  id?: string;
  placeholder?: string;
  label?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  isValid?: boolean;
  isInvalid?: boolean;
  errors?: IError[];
  transitionClasses?: string;
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    modelValue: '',
    type: 'text',
    autocomplete: 'off',
    name: '',
    id: '',
    placeholder: '',
    label: '',
    isDisabled: false,
    isLoading: false,
    isValid: false,
    isInvalid: false,
    errors: (): IError[] => [],
    transitionClasses: 'transition-colors duration-300',
  }
);

const emit = defineEmits(['update:modelValue', 'input-blur', 'input-focus']);

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const isFocused = ref(false);

const inputRef = useTemplateRef('inputRef');

const inputInnerBorderColor = computed(() => {
  if (props.isInvalid) return 'border-accent-red';
  if (props.isValid) return 'border-accent-green';
  if (props.isDisabled) return 'border-neutral-500';
  if (isFocused.value) return 'border-neutral-200';

  return 'border-neutral-500';
});

const inputBackgroundColor = computed(() => {
  if (props.isDisabled) return 'bg-neutral-600';

  return 'bg-neutral-950';
});

const textColor = computed(() => {
  if (props.isInvalid) return 'text-accent-red';
  if (props.isValid) return 'text-accent-green';
  if (isFocused.value) return 'text-neutral-200';

  return 'text-neutral-500';
});

const inputPlaceholderColor = computed(() => {
  if (props.isInvalid) return 'text-placeholder-red';
  if (props.isValid) return 'text-placeholder-green';
  if (isFocused.value) return 'text-placeholder-200';

  return 'placeholder-neutral-500';
});

const inputClasses = computed(() => [
  inputInnerBorderColor.value,
  inputBackgroundColor.value,
  textColor.value,
  inputPlaceholderColor.value,
  props.transitionClasses,
]);

const inputProps = computed(() => ({
  id: props.id,
  name: props.name,
  type: props.type,
  disabled: props.isDisabled,
  autocomplete: props.autocomplete,
  placeholder: props.placeholder,
  class: inputClasses.value
}));

function handleBlur() {
  isFocused.value = false;

  emit('input-blur', props.name);
}

function handleFocus() {
  isFocused.value = true;

  emit('input-focus', props.name);
}
</script>

<template>
  <div :class="[
    { 'pointer-events-none': props.isDisabled },
    props.transitionClasses
  ]">
    <div class="select-none">
      <label
        v-if="props.label"
        class="block pl-1 pb-1 text-sm font-normal text-left"
        :class="textColor"
        :for="props.id"
        v-text="props.label"
      />

      <input
        ref="inputRef"
        v-model="model"
        v-bind="inputProps"
        class="group relative h-11 p-3 w-full appearance-none border outline-none rounded-sm"
        @blur="handleBlur"
        @focus="handleFocus"
      />
    </div>

    <BaseValidationErrors
      v-if="props.errors.length"
      :errors="props.errors"
    />
  </div>
</template>
