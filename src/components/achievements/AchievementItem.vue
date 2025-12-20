<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
  },

  value: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="rounded-sm bg-neutral-700 text-md font-semibold p-2"
  >
    <p v-text="props.id " />

    <p
      v-text="props.value"
    />

    <p
      v-text="props.status"
    />
  </div>
</template>
