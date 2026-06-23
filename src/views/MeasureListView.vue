<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue'
import { format, isSameDay } from 'date-fns'

import BaseLoader from '@/components/base/BaseLoader.vue'

import { useMeasure, DATE_FNS_LOCALES_LIST } from '@/composables'

const MeasureListItem = defineAsyncComponent(
  () => import('@/components/measure-list/MeasureListItem.vue'),
)
const MeasureListEmptyState = defineAsyncComponent(
  () => import('@/components/measure-list/MeasureListEmptyState.vue'),
)

const { measureList, isLoadingMeasureList, getMeasureList } = useMeasure()

getMeasureList()

const groupedMeasureList = computed(() =>
  measureList.value.map((item, index) => ({
    ...item,
    isTitleShown:
      index === 0 || !isSameDay(item.createdAt, measureList.value[index - 1].createdAt),
  })),
)
</script>

<template>
  <section class="relative flex flex-1 flex-col gap-4">
    <Transition mode="out-in" name="transition-fade">
      <BaseLoader v-if="isLoadingMeasureList && measureList.length === 0" class="size-20 m-auto" />

      <div v-else-if="measureList.length > 0" class="flex flex-col gap-4">
        <div
          v-for="measureListItem in groupedMeasureList"
          :key="measureListItem.id"
          class="flex flex-col gap-2"
        >
          <p
            v-if="measureListItem.isTitleShown"
            class="text-text-primary font-bold text-lg transition-colors duration-300"
            v-text="
              format(measureListItem.createdAt, 'MMMM d, yyyy', {
                locale: DATE_FNS_LOCALES_LIST[$i18n.locale as keyof typeof DATE_FNS_LOCALES_LIST],
              })
            "
          />

          <MeasureListItem v-bind="{ ...measureListItem, id: Number(measureListItem.id) }" />
        </div>
      </div>

      <MeasureListEmptyState v-else />
    </Transition>
  </section>
</template>
