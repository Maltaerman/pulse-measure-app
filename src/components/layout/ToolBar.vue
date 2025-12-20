<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

import { PAGE_NAME_ENUM } from '@/router'

import BaseTabs from '@/components/bases/tabs/BaseTabs.vue';

const router = useRouter();

const tabs = [
  { id: PAGE_NAME_ENUM.MAIN, label: PAGE_NAME_ENUM.MAIN  },
  { id: PAGE_NAME_ENUM.HISTORY, label: PAGE_NAME_ENUM.HISTORY  },
  { id: PAGE_NAME_ENUM.SETTINGS, label: PAGE_NAME_ENUM.SETTINGS  },
];

const tabId = ref(null);

watchEffect(() => {
  if (tabId.value) {
    router.push({ name: tabId.value })
  }
})
</script>

<template>
  <BaseTabs
    class="h-(--toolbarHeight) w-full"
    v-bind="{ tabs }"
    size="lg"
    @change-active-tab="({ id }) => tabId = id"
  />
</template>
