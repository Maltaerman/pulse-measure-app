<script setup lang="ts">
import { usePopupManager } from '@/components/popups/usePopupManager'
import BaseIcon from '@/components/bases/BaseIcon.vue'

const { closePopup } = usePopupManager()
</script>

<template>
  <button type="button" @click="closePopup">
    <BaseIcon
      name="close"
      class="z-19 absolute right-2 top-2 size-4 text-text-muted hover:text-text-primary transition"
    />
  </button>

  <div class="relative">
    <img class="sm:rounded-2xl" src="/public/img/info-banner.png" alt="info banner" />

    <p
      class="absolute left-1/2 bottom-4 -translate-x-1/2 text-text-primary text-lg font-medium text-center"
      v-text="$t(`info_title`)"
    />
  </div>
</template>
