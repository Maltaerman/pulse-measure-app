<script setup lang="ts">
import { PAGE_NAME_ENUM } from '@/router';
</script>

<template>
  <div
    class="grid grid-cols-2 text-md text-md text-neutral-950 bg-neutral-200 rounded-sm font-medium p-2 cursor-pointer"
    @click="$router.push({
      name: PAGE_NAME_ENUM.MEASURE_ITEM,
      params: { id: $attrs.id },
    })"
  >
    <pre>
      {{ $attrs }}
    </pre>
  </div>
</template>
