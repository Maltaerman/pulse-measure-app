<script setup lang="ts">
import { Grid, Navigation, Pagination, Autoplay, Scrollbar } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/vue'

import { computed, useId } from 'vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/grid'

const props = defineProps({
  component: {
    type: Object,
    required: true,
  },

  slides: {
    type: Array,
    default: () => [],
  },

  breakpoints: {
    type: Object,
    default: () => ({
      0: { slidesPerView: 'auto', slidesPerGroup: 1, spaceBetween: 12 },
    }),
  },

  prevBtnId: {
    type: String,
    default: '',
  },

  nextBtnId: {
    type: String,
    default: '',
  },

  pagination: {
    type: [Boolean, Object],
    default: false,
  },

  grid: {
    type: Object,
    default: null,
  },

  title: {
    type: String,
    default: '',
  },

  routeData: {
    type: Object,
    default: null,
  },

  areControlsShown: {
    type: Boolean,
    default: true,
  },

  headerMarginClass: {
    type: String,
    default: 'mb-4',
  },

  headerJustifyClass: {
    type: String,
    default: 'justify-between',
  },

  itemWidthClass: {
    type: String,
    default: '',
  },

  itemHeightClass: {
    type: String,
    default: '',
  },

  swiperOffset: {
    type: String,
    default: '',
  },

  autoplay: {
    type: Object,
    default: undefined,
  },

  isShadowShown: {
    type: Boolean,
    default: false,
  },

  leftShadowPositionClasses: {
    type: String,
    default: 'left-0 bottom-0 top-0',
  },

  rightShadowPositionClasses: {
    type: String,
    default: 'right-0 bottom-0 top-0',
  },

  shadowWidthClass: {
    type: String,
    default: 'w-30',
  },

  isCenterInsufficientSlides: {
    type: Boolean,
    default: false,
  },

  needScrollbar: {
    type: Boolean,
    default: false,
  },
})

const nextBtnId = props.nextBtnId || useId()
const prevBtnId = props.prevBtnId || useId()

const swiperOptions = computed(() => ({
  modules: [Navigation, Pagination, Autoplay, Scrollbar, ...(props.grid ? [Grid] : [])],
  ...(props.grid ? { grid: props.grid } : {}),
  breakpoints: props.breakpoints,
  pagination: props.pagination,
  navigation: {
    nextEl: `#${nextBtnId}`,
    prevEl: `#${prevBtnId}`,
    disabledClass: '--disabled',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
    hide: false,
    enabled: props.needScrollbar,
  },
  autoplay: props.autoplay,
  centerInsufficientSlides: props.isCenterInsufficientSlides,
}))
</script>

<template>
  <div class="relative">
    <Swiper v-bind="swiperOptions" :class="props.swiperOffset">
      <SwiperSlide v-for="(slide, index) in props.slides" :key="index">
        <slot name="slide" v-bind="{ slide, index }">
          <component
            :is="props.component"
            v-bind="slide"
            :class="[props.itemWidthClass, props.itemHeightClass]"
          />
        </slot>
      </SwiperSlide>

      <div v-if="props.needScrollbar" class="swiper-scrollbar" />
    </Swiper>
  </div>
</template>

<style lang="css">
@reference "tailwindcss";

.swiperPaginationButtons {
  @apply !w-fit;
}

.swiperPaginationButtons > .swiper-pagination-bullets {
  @apply flex shrink-0 items-center justify-center gap-2;
}

.swiperPaginationButtons > .swiper-pagination-bullet {
  @apply transition-all duration-300 relative isolate z-10 h-2 w-4 shrink-0 overflow-hidden rounded-full bg-red-400 hover:bg-red-600 text-transparent;
}

.swiperPaginationButtons > .swiper-pagination-bullet-active {
  @apply rounded-full bg-red-600 w-10;
}
</style>
