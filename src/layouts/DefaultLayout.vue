<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { PAGE_NAME_ENUM } from '@/router'
import { POPUP_NAME_ENUM } from '@/components/popups'

import PopupManager from '@/components/popups/PopupManager.vue'
import { usePopupManager } from '@/composables'

import LayoutDefaultHeader from '@/components/layouts/LayoutDefaultHeader.vue'
import LayoutDefaultMeasureButton from '@/components/layouts/LayoutDefaultMeasureButton.vue'

const route = useRoute()
const { openPopup } = usePopupManager()

const isMeasureButton = computed(() =>
  [PAGE_NAME_ENUM.MEASURE_LIST, PAGE_NAME_ENUM.MEASURE_ITEM].includes(route.name as string),
)

setTimeout(() => openPopup({ component: POPUP_NAME_ENUM.FEATURES_INFO }), 1000)
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <LayoutDefaultHeader class="sticky top-0 z-20 h-(--headerHeight)" />

    <main
      class="relative flex size-full flex-1 flex-col --screenMinHeight transition-colors duration-300 p-4 bg-bg"
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
