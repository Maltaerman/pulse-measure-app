<script setup lang="ts">
export interface IError {
  message: string;
}

export interface IProps {
  errors: IError[];
}

const props = withDefaults(
  defineProps<IProps>(),
  { errors: () => [] }
);
</script>

<template>
  <TransitionGroup
    class="relative pl-1"
    name="list-from-left"
    tag="ul"
  >
    <li
      v-for="error in props.errors"
      :key="error.message"
      class="pt-1 text-sm font-normal text-accent-red"
    >
      <p v-text="error.message" />
    </li>
  </TransitionGroup>
</template>
