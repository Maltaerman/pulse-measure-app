<script setup lang="ts">
import { computed, type Component } from 'vue'

import { Navigation, Pagination, Autoplay, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/grid'

interface IBreakpoint {
  slidesPerView?: number | 'auto'
  slidesPerGroup?: number
  spaceBetween?: number
}

interface ISlide {
  id: number | string
  [key: string]: unknown
}

interface IPagination {
  clickable?: boolean
  dynamicBullets?: boolean
  [key: string]: unknown
}

interface IAutoplay {
  delay?: number
  disableOnInteraction?: boolean
  [key: string]: unknown
}

interface IProps {
  component: Component
  slides?: ISlide[]
  breakpoints?: Record<number, IBreakpoint>
  pagination?: boolean | IPagination
  itemWidthClass?: string
  itemHeightClass?: string
  swiperOffset?: string
  autoplay?: boolean | IAutoplay
}

const props = withDefaults(defineProps<IProps>(), {
  slides: () => [],
  breakpoints: () => ({
    0: { slidesPerView: 'auto', slidesPerGroup: 1, spaceBetween: 12 },
  }),
  pagination: false,
  itemWidthClass: '',
  itemHeightClass: '',
  swiperOffset: '',
  autoplay: false,
})

const swiperOptions = computed(() => ({
  modules: [Navigation, Pagination, Autoplay, Scrollbar],
  breakpoints: props.breakpoints,
  pagination: props.pagination,
  scrollbar: {
    el: '',
    draggable: true,
    hide: false,
  },
  autoplay: props.autoplay,
}))
</script>

<template>
  <div class="relative">
    <Swiper v-bind="swiperOptions" :class="props.swiperOffset">
      <SwiperSlide v-for="(slide, key) in props.slides" :key="key">
        <slot name="slide" v-bind="{ slide, key }">
          <component
            :is="props.component"
            v-bind="slide"
            :class="[props.itemWidthClass, props.itemHeightClass]"
          />
        </slot>
      </SwiperSlide>
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
  @apply transition-all duration-300 relative isolate z-10 h-2 w-4 shrink-0 overflow-hidden rounded-full bg-red-400 hover:bg-red-600;
}

.swiperPaginationButtons > .swiper-pagination-bullet-active {
  @apply rounded-full bg-red-600 w-10;
}
</style>
