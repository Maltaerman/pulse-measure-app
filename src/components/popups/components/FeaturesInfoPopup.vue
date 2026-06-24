<script setup lang="ts">
import { BaseIcon, BaseSwiper, BaseSwiperItem } from '@/components/base'

import { usePopupManager } from '@/composables'

const { closePopup } = usePopupManager()

const SLIDES = [
  {
    title: 'popup_features_slide-item_1_title',
    subtitle: 'popup_features_slide-item_1_subtitle',
    img: 'colored-features-info-slide-1',
  },

  {
    title: 'popup_features_slide-item_2_title',
    subtitle: 'popup_features_slide-item_2_subtitle',
    img: 'colored-features-info-slide-2',
  },

  {
    title: 'popup_features_slide-item_3_title',
    subtitle: 'popup_features_slide-item_3_subtitle',
    img: 'colored-features-info-slide-3',
  },

  {
    title: 'popup_features_slide-item_4_title',
    subtitle: 'popup_features_slide-item_4_subtitle',
    img: 'colored-features-info-slide-4',
  },

  {
    title: 'popup_features_slide-item_5_title',
    subtitle: 'popup_features_slide-item_5_subtitle',
    img: 'colored-features-info-slide-5',
  },

  {
    title: 'popup_features_slide-item_6_title',
    subtitle: 'popup_features_slide-item_6_subtitle',
    img: 'colored-features-info-slide-6',
  },
]

const pagination = {
  el: '.swiperPaginationButtons',
  clickable: true,
  renderBullet: function (index: number, className: string) {
    return `<button class="${className}"></button>`
  },
}
</script>

<template>
  <div class="relative">
    <button type="button" class="z-10 absolute right-4 top-4 cursor-pointer" @click="closePopup">
      <BaseIcon
        name="close"
        class="size-4 text-text-muted hover:text-text-primary transition-all duration-300"
      />
    </button>

    <BaseSwiper
      :component="BaseSwiperItem"
      :pagination="pagination"
      :slides="SLIDES"
      :autoplay="{ delay: 2000 }"
    />

    <div class="mb-4 flex w-full items-center justify-center">
      <div class="swiperPaginationButtons" />
    </div>
  </div>
</template>
