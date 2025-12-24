<script setup lang="ts">
import BaseTitle from '@/components/bases/BaseTitle.vue';
import BaseButton from '@/components/bases/BaseButton.vue';
</script>

<template>
  <div class="flex flex-row gap-2 items-center justify-between">
    <BaseTitle><slot /></BaseTitle>

    <BaseButton @click="$router.go(-1)">
      Go Back
    </BaseButton>
  </div>   
</template>