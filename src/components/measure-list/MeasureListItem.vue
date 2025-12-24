<script setup lang="ts">
import { PAGE_NAME_ENUM } from '@/router';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },

  value: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div
    class="grid grid-cols-2 text-md text-md text-neutral-950 bg-neutral-200 rounded-sm font-medium p-2 cursor-pointer"
    @click="$router.push({
      name: PAGE_NAME_ENUM.MEASURE_ITEM,
      params: { id: props.id },
    })"
  >
    <p v-text="props.id " />

    <p
      class="text-right"  
      v-text="props.value"
    />
  </div>
</template>
