<script setup lang="ts">
import { PAGE_NAME_ENUM } from '@/router'

import BaseTabs from '@/components/bases/tabs/BaseTabs.vue';

const tabs = [
  { id: PAGE_NAME_ENUM.MAIN, label: PAGE_NAME_ENUM.MAIN  },
  { id: PAGE_NAME_ENUM.HISTORY, label: PAGE_NAME_ENUM.HISTORY  },
  { id: PAGE_NAME_ENUM.SETTINGS, label: PAGE_NAME_ENUM.SETTINGS  },
];
</script>

<template>
  <BaseTabs
    class="h-(--toolbarHeight) w-full"
    v-bind="{ tabs }"
    size="lg"
    @change-active-tab="({ id }) => $router.push({ name: id })"
  />
</template>
