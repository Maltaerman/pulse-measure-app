<script lang="ts" setup>

import { PAGE_NAME_ENUM } from '@/router'

import CommonHeart from '@/components/CommonHeart.vue'
</script>

<template>
  <button
    type="button"
    @click="$router.push({ name: PAGE_NAME_ENUM.MEASURE })"
  >
    <CommonHeart :size="20" />
    
    <CommonHeart
      :size="20"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping [animation-delay:100ms]"
    />
  
    <CommonHeart
      :size="22"
      class="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping [animation-delay:500ms]"
    />
  
    <CommonHeart
      :size="24"
      class="absolute  left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping [animation-delay:900ms]"
    />
  </button>
</template>
