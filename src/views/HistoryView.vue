<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

import { useHistoryList } from '@/components/history/useHistoryList';

const HistoryList = defineAsyncComponent(
  () => import('@/components/history/HistoryList.vue')
);

const { historyList, getHistoryList } = useHistoryList();

getHistoryList();
</script>

<template>
  <div>
    <p
      class="text-lg font-semibold col-span-2 text-neutral-800"
      v-text="'History'"
    />

    <Transition
      mode="out-in"
      name="transition-fade"
    >
      <HistoryList
        v-if="historyList.length"
        class="w-full"
      />

      <div
        v-else
        class="flex p-2"
      >
        <p
          class="text-lg font-semibold col-span-2 text-neutral-800"
          v-text="'No measure history'"
        />
      </div>      
    </Transition>
  </div>
</template>