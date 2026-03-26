<script lang="ts" setup>
import { ref } from 'vue'


import DefaultHeader from '@/components/layout/DefaultHeader.vue';


import ToolBar from '@/components/layout/ToolBar.vue';
import CookieBanner from '@/components/layout/CookieBanner.vue';

const isCookieBannerShown = ref(false);
</script>

<template>
  <div>
    <DefaultHeader class="sticky top-0 z-50 h-(--headerHeight)" />

    <main class="relative flex size-full flex-1 flex-col --screenMinHeight transition-colors duration-300 p-2 bg-bg">
      <slot />
    </main>


    <!-- <ToolBar class="fixed bottom-0" /> -->

    <!-- <CookieBanner v-if="isCookieBannerShown" /> -->
  </div>
</template>
