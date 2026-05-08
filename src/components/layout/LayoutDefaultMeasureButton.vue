<script lang="ts" setup>
import { PAGE_NAME_ENUM } from '@/router'

import BaseHeart from '@/components/bases/BaseHeart.vue'
</script>

<template>
  <button type="button" class="cursor-pointer" @click="$router.push({ name: PAGE_NAME_ENUM.MAIN })">
    <BaseHeart :size="20" class="animate-heartbeat" />

    <BaseHeart
      :size="20"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping [animation-delay:100ms]"
    />

    <BaseHeart
      :size="22"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping [animation-delay:500ms]"
    />

    <BaseHeart
      :size="24"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping [animation-delay:900ms]"
    />
  </button>
</template>
