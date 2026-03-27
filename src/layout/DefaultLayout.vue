<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { PAGE_NAME_ENUM } from '@/router'

import DefaultHeader from '@/components/layout/DefaultHeader.vue'
import MeasureButton from '@/components/layout/MeasureButton.vue'

const route = useRoute()

const isMeasureButton = computed(() =>
  [PAGE_NAME_ENUM.MEASURE_LIST, PAGE_NAME_ENUM.MEASURE_ITEM, PAGE_NAME_ENUM.SETTINGS].includes(
    route.name as string,
  ),
)
</script>

<template>
  <div>
    <DefaultHeader class="sticky top-0 z-50 h-(--headerHeight)" />

    <main
      class="relative flex size-full flex-1 flex-col --screenMinHeight transition-colors duration-300 p-2 bg-bg"
    >
      <slot />

      <MeasureButton v-if="isMeasureButton" class="fixed bottom-8 left-8" />
    </main>
  </div>
</template>
