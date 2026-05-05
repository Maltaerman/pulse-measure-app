<script setup lang="ts">
import { usePopupManager } from '@/components/popups/usePopupManager'
import BaseIcon from '@/components/bases/BaseIcon.vue'

const { closePopup } = usePopupManager()

import BaseSwiper from '@/components/bases/BaseSwiper.vue'
import InfoSlideItem from '@/components/InfoSlideItem.vue'

const prevBtnId = 'button-prev'
const nextBtnId = '-button-next'

const slides = [
  {
    id: 1,
    title: 'popup_info_slide-item_1_title',
    subtitle: 'popup_info_slide-item_1_subtitle',
    img: 'colored-info-slide-1',
  },
  {
    id: 2,
    title: 'popup_info_slide-item_2_title',
    subtitle: 'popup_info_slide-item_2_subtitle',
    img: 'colored-info-slide-2',
  },
  {
    id: 3,
    title: 'popup_info_slide-item_3_title',
    subtitle: 'popup_info_slide-item_3_subtitle',
    img: 'colored-info-slide-3',
  },
  {
    id: 4,
    title: 'popup_info_slide-item_4_title',
    subtitle: 'popup_info_slide-item_4_subtitle',
    img: 'colored-info-slide-4',
  },
]

const pagination = {
  el: '.swiperPaginationButtons',
  clickable: true,
  renderBullet: function (index: number, className: string) {
    return `<button class="${className}"> ${index + 1} </button>`
  },
}
</script>

<template>
  <div class="relative">
    <!-- <button type="button" @click="closePopup">
      <BaseIcon
        name="close"
        class="z-19 absolute right-4 top-4 size-5 text-text-muted hover:text-text-primary transition"
      />
    </button> -->

    <button type="button" class="z-10 absolute right-4 top-4 cursor-pointer" @click="closePopup">
      <BaseIcon
        name="close"
        class="size-4 text-text-muted hover:text-text-primary transition-all duration-300"
      />
    </button>

    <BaseSwiper
      :component="InfoSlideItem"
      :pagination="pagination"
      :prev-btn-id="prevBtnId"
      :next-btn-id="nextBtnId"
      :slides="slides"
      swiper-offset="!overflow-hidden"
      :autoplay="{ delay: 2000 }"
    />

    <div class="mb-4 flex w-full items-center justify-center">
      <div class="swiperPaginationButtons" />
    </div>
  </div>
</template>
