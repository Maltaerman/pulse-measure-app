<script setup lang="ts">
import { useHistoryList } from '@/components/history/useHistoryList';

const { historyList, getHistoryList } = useHistoryList();

getHistoryList();
</script>

<template>
  <div class="flex flex-col gap-4 bg-neutral-600 rounded-sm p-2">
    Last measure / {{ historyList[historyList.length -1]?.value || '--' }}
  </div>
</template>