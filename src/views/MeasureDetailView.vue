<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { format } from 'date-fns'

import BaseLoader from '@/components/base/BaseLoader.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import MeasireDetailInfo from '@/components/measure-detail/MeasireDetailInfo.vue'
import MeasireDetailZoneBar from '@/components/measure-detail/MeasireDetailZoneBar.vue'
import { POPUP_NAME_ENUM } from '@/components/popups/types'

import {
  usePopupManager,
  useMeasure,
  useMeasureDetail,
  DATE_FNS_LOCALES_LIST,
} from '@/composables'

const route = useRoute()
const { locale, t: $t } = useI18n()

const { openPopup, closePopup } = usePopupManager()
const { measureList, isLoadingMeasureList, getMeasureList, deleteMeasure } = useMeasure()

getMeasureList()

const measureData = computed(() => measureList.value.find(({ id }) => id === route.params.id))

const { duration, bpmMin, bpmAvg, bpmMax, hrv, zone } = useMeasureDetail(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  measureData as unknown as import('vue').UnwrapRef<any>,
)

const measureStats = computed(() => [
  {
    title: $t('global_min'),
    value: bpmMin.value,
    subtitle: 'bpm',
  },
  {
    title: $t('global_average'),
    value: bpmAvg.value,
    subtitle: 'bpm',
  },
  {
    title: $t('global_max'),
    value: bpmMax.value,
    subtitle: 'bpm',
  },
  {
    title: $t('global_variability'),
    value: hrv.value,
    subtitle: 'ms HRV',
  },
])

const measureStats2 = computed(() => [
  {
    title: $t('global_time'),
    value: format(measureData.value?.createdAt || 0, 'HH:MM', {
      locale: DATE_FNS_LOCALES_LIST[locale.value as keyof typeof DATE_FNS_LOCALES_LIST],
    }),
  },
  {
    title: $t('global_duration'),
    value: duration.value,
  },
  {
    title: $t('global_date'),
    value: format(measureData.value?.createdAt || 0, 'MMM dd', {
      locale: DATE_FNS_LOCALES_LIST[locale.value as keyof typeof DATE_FNS_LOCALES_LIST],
    }),
  },
])

function deleteButtonHandler() {
  function callback() {
    try {
      if (!measureData.value?.id) return

      deleteMeasure(measureData.value.id as number)
    } finally {
      closePopup()
    }
  }

  openPopup({
    component: POPUP_NAME_ENUM.CONFIRMATION,
    data: {
      title: 'popup_confirmation_title',
      subtitle: 'popup_confirmation_subtitle',
      submitButton: 'popup_confirmation_submit',
      cancelButton: 'popup_confirmation_cancel',
      callback,
    },
  })
}
</script>

<template>
  <Transition mode="out-in" name="transition-fade">
    <BaseLoader v-if="isLoadingMeasureList && measureList.length === 0" class="size-20 m-auto" />

    <section v-else-if="measureData" class="flex flex-col gap-3 flex-1">
      <MeasireDetailInfo
        :bpmAvg="measureData.bpmAvg || 0"
        :created-at="measureData.createdAt"
        :measure="measureData.measure"
      />

      <div class="grid grid-cols-2 gap-2">
        <div
          v-for="({ title, value, subtitle }, index) in measureStats"
          :key="index"
          class="rounded-lg p-3 flex flex-col items-start gap-0.5"
          :class="index === 1 ? 'bg-primary-active/50' : 'bg-bg-muted'"
        >
          <p
            :class="index === 1 ? 'text-primary' : 'text-text-muted'"
            class="text-xs font-medium uppercase mb-1"
            v-text="title"
          />

          <div class="flex flex-row items-center justify-center gap-1">
            <p
              :class="index === 1 ? 'text-primary' : 'text-text-secondary'"
              class="text-sm font-bold leading-none"
              v-text="value"
            />

            <p
              :class="index === 1 ? 'text-primary' : 'text-text-secondary'"
              class="text-xs font-medium mt-0.5"
              v-text="subtitle"
            />
          </div>
        </div>
      </div>

      <MeasireDetailZoneBar :zone="zone" />

      <div class="bg-bg-muted rounded-lg px-4 py-3 flex items-center justify-between">
        <div
          v-for="{ title, value } in measureStats2"
          :key="title"
          class="flex flex-col items-center gap-0.5"
        >
          <span class="text-sm font-bold text-text-primary" v-text="value" />
          <span class="text-xs uppercase text-text-muted" v-text="title" />
        </div>
      </div>

      <BaseButton class="mt-auto" size="lg" @click="deleteButtonHandler">
        {{ $t('measure_detail_delete') }}
      </BaseButton>
    </section>

    <section v-else>
      <p
        class="size-full m-auto text-center px-4 py-3 text-lg font-medium text-text-primary transition-colors duration-300"
        v-text="$t('measure_detail_empty')"
      />
    </section>
  </Transition>
</template>
