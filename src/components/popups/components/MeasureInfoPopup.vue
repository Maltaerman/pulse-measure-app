<script setup lang="ts">
import BaseIcon from '@/components/bases/BaseIcon.vue'
import BaseSwiper from '@/components/bases/BaseSwiper.vue'
import BaseSwiperItem from '@/components/bases/BaseSwiperItem.vue'

import { usePopupManager } from '@/composables/usePopupManager'

const { closePopup } = usePopupManager()

const SLIDES = [
  {
    title: 'popup_measure-info_slide-item_1_title',
    subtitle: 'popup_measure-info_slide-item_1_subtitle',
    img: 'colored-measure-info-slide-1',
  },

  {
    title: 'popup_measure-info_slide-item_2_title',
    subtitle: 'popup_measure-info_slide-item_2_subtitle',
    img: 'colored-measure-info-slide-2',
  },

  {
    title: 'popup_measure-info_slide-item_3_title',
    subtitle: 'popup_measure-info_slide-item_3_subtitle',
    img: 'colored-measure-info-slide-3',
  },

  {
    title: 'popup_measure-info_slide-item_4_title',
    subtitle: 'popup_measure-info_slide-item_4_subtitle',
    img: 'colored-measure-info-slide-4',
  },

  {
    title: 'popup_measure-info_slide-item_5_title',
    subtitle: 'popup_measure-info_slide-item_5_subtitle',
    img: 'colored-measure-info-slide-5',
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
