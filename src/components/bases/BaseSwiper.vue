<script setup lang="ts">
import { computed } from 'vue'

import { Grid, Navigation, Pagination, Autoplay, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

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

  pagination: {
    type: [Boolean, Object],
    default: false,
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
    type: [Boolean, Object],
    default: false,
  },
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
