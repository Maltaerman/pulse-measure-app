<script setup lang="ts">
import {
  Grid,
  Navigation,
  Pagination,
  Autoplay,
  Scrollbar,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed } from 'vue';

// import { EMIT_ENUM } from '@root/common-types';
// import { useScrollShadowEffect, useDeviceType } from '@root/composables';
import { generateUniqueId } from '@root/utils';

import BaseButton from '@/components/base/BaseButton.vue';
// import BaseObserver from '@/components/base/BaseObserver.vue';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/grid';

// const { isDesktop } = useDeviceType();

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
      0: { slidesPerView: 'auto', slidesPerGroup: 3, spaceBetween: 16 },
      540: { slidesPerView: 'auto', slidesPerGroup: 4, spaceBetween: 16 },
      768: { slidesPerView: 'auto', slidesPerGroup: 5, spaceBetween: 16 },
      1024: { slidesPerView: 'auto', slidesPerGroup: 6, spaceBetween: 16 },
      1440: { slidesPerView: 'auto', slidesPerGroup: 7, spaceBetween: 16 },
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
});

// const { toggleShadow, isRightShadowShown, isLeftShadowShown } =
//   useScrollShadowEffect();

const nextBtnId = props.nextBtnId || generateUniqueId('next-');
const prevBtnId = props.prevBtnId || generateUniqueId('prev-');

const swiperOptions = computed(() => ({
  modules: [
    Navigation,
    Pagination,
    Autoplay,
    Scrollbar,
    ...(props.grid ? [Grid] : []),
  ],
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
}));
</script>

<template>
  <div class="relative">
    <slot name="header">
      <header
        v-if="props.title"
        class="baseSwiper-header flex min-h-9 w-full items-center"
        :class="[props.headerMarginClass, props.headerJustifyClass]"
      >
        <div class="flex items-center">
          <span
            class="baseSwiper-title text-xl font-extrabold text-light"
            v-text="$t(props.title)"
          />
        </div>

        <div
          v-if="props.areControlsShown"
          class="flex items-center gap-3"
        >
          <BaseButton
            v-if="props.routeData"
            size="sm"
            theme="secondary"
            :to="props.routeData"
          >
            {{ $t('base-swiper_see-all-button') }}
          </BaseButton>

          <div
            v-if="isDesktop"
            class="flex items-center justify-center gap-2"
          >
            <BaseButton
              :id="prevBtnId"
              class="swiper-button"
              icon-name="arrow"
              icon-rotate="rotate-90"
              is-only-icon
              size="sm"
              theme="secondary"
            />

            <BaseButton
              :id="nextBtnId"
              class="swiper-button"
              icon-name="arrow"
              icon-rotate="-rotate-90"
              is-only-icon
              size="sm"
              theme="secondary"
            />
          </div>
        </div>
      </header>
    </slot>

    <div class="relative">
      <Swiper
        v-bind="swiperOptions"
        :class="props.swiperOffset"
      >
        <SwiperSlide
          v-for="(slide, index) in props.slides"
          :key="index"
          :class="[props.itemWidthClass, props.itemHeightClass]"
        >
          <slot
            name="slide"
            v-bind="{ slide, index }"
          >
            <!-- <BaseObserver
              v-if="index === 0 && props.isShadowShown"
              :options="{
                root: null,
                rootMargin: '100%',
                threshold: 0,
              }"
              position-classes="absolute left-0 top-0"
              @[EMIT_ENUM.APPEAR]="toggleShadow('left', false)"
              @[EMIT_ENUM.DISAPPEAR]="toggleShadow('left', true)"
            /> -->

            <component
              :is="props.component"
              v-bind="slide"
            />

            <!-- <BaseObserver
              v-if="index === props.slides.length - 1 && props.isShadowShown"
              :options="{
                root: null,
                rootMargin: '100%',
                threshold: 0,
              }"
              position-classes="absolute right-0 top-0"
              @[EMIT_ENUM.APPEAR]="toggleShadow('right', false)"
              @[EMIT_ENUM.DISAPPEAR]="toggleShadow('right', true)"
            /> -->
          </slot>
        </SwiperSlide>

        <div
          v-if="props.needScrollbar"
          class="swiper-scrollbar"
        />
      </Swiper>
    </div>

    <!-- <template v-if="props.isShadowShown">
      <div
        class="pointer-events-none absolute z-10 rotate-180 transition-opacity
          duration-300"
        :class="[
          props.leftShadowPositionClasses,
          props.shadowWidthClass,
          { 'opacity-0': !isLeftShadowShown },
        ]"
      />

      <div
        class="pointer-events-none absolute inset-y-0 -right-10 z-10
          transition-opacity duration-300"
        :class="[
          props.rightShadowPositionClasses,
          props.shadowWidthClass,
          { 'opacity-0': !isRightShadowShown },
        ]"
      />
    </template> -->
  </div>
</template>

<style>
.swiper-button.--disabled {
  @apply pointer-events-none text-surface-100 can-hover:cursor-default;
}

.swiper-button.--disabled .baseButton__shadow {
  @apply z-0 bg-surface-200;
}

.swiper-pagination-buttons {
  @apply flex !w-max gap-1;
}

.swiper-horizontal > .swiper-scrollbar {
  @apply relative left-0 mt-2.5 w-full rounded-12 bg-primary-100 can-hover:cursor-pointer;
}

.swiper-scrollbar-drag {
  @apply h-full rounded-8 bg-primary-400;
}

.--achievement {
  @apply gap-2 p-0;
}

.--achievement .swiper-pagination-bullet {
  @apply relative z-10 !mx-0 h-8 w-8 rotate-0 rounded-12 bg-transparent bg-button-default bg-cover text-md2 font-black text-light opacity-100 shadow-primary-600-sm-inner transition-colors duration-300 text-shadow-primary-600 text-stroke-primary-500 before:absolute before:left-0 before:top-0 before:-z-1 before:size-full before:bg-button-hover before:bg-cover before:opacity-1 before:transition-opacity before:duration-300 can-hover:hover:before:opacity-100;
}

.--achievement .swiper-pagination-bullet-active {
  @apply relative h-8 w-8 bg-button-active bg-cover text-light shadow-primary-600-sm-inner transition-colors duration-300 before:!opacity-0;
}
</style>
