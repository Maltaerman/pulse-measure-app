<script setup lang="ts">
import HistoryListItem from './HistoryListItem.vue';
import { useHistoryList } from './useHistoryList';

const { historyList } = useHistoryList();
</script>

<template>
  <div class="flex flex-col gap-4">
    <HistoryListItem
      v-for="historyListItem in historyList"
      :key="historyListItem.id"
      v-bind="historyListItem"
    />
  </div>
</template>
