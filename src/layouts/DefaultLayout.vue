<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { PAGE_NAME_ENUM } from '@/router'

import PopupManager from '@/components/popups/PopupManager.vue'

import LayoutDefaultHeader from '@/components/layouts/LayoutDefaultHeader.vue'
import LayoutDefaultMeasureButton from '@/components/layouts/LayoutDefaultMeasureButton.vue'

const route = useRoute()

const isMeasureButton = computed(() =>
  [PAGE_NAME_ENUM.MEASURE_LIST, PAGE_NAME_ENUM.MEASURE_ITEM].includes(route.name as string),
)
</script>

<template>
  <div class="max-w-3xl mx-auto scrollbar-none --screenMinHeight">
    <LayoutDefaultHeader class="sticky top-0 z-20 h-(--headerHeight)" />

    <main
      class="--screenMinHeight relative flex size-full flex-1 flex-col transition-colors duration-300 p-4 bg-bg scrollbar-none"
    >
      <slot />

      <Transition name="transition-fade">
        <LayoutDefaultMeasureButton
          v-if="isMeasureButton"
          class="fixed bottom-8 left-8 md:left-[calc((100%-672px)/2)]"
        />
      </Transition>
    </main>

    <Transition mode="out-in" name="transition-fade">
      <PopupManager class="z-(--zIndexPopup)" />
    </Transition>
  </div>
</template>
