<script setup lang="ts">
import { usePopupManager } from '@/components/popups/usePopupManager'

import BaseButton from '@/components/bases/BaseButton.vue'
import BaseIcon from '@/components/bases/BaseIcon.vue'

const { closePopup } = usePopupManager()

export interface IProps {
  data: {
    title: string
    subtitle: string
    callback: () => void
  }
}

const props = withDefaults(defineProps<IProps>(), {
  data: () => ({
    title: '',
    subtitle: '',
    callback: () => {},
  }),
})
</script>

<template>
  <div class="flex flex-col gap-4 p-5">
    <div class="flex flex-row items-center justify-between">
      <h2 class="text-lg font-semibold text-text-primary" v-text="props.data.title" />

      <button type="button" @click="closePopup">
        <BaseIcon name="close" class="size-4 text-text-muted hover:text-text-primary transition" />
      </button>
    </div>

    <p class="text-center text-sm text-text-secondary sm:text-left" v-text="props.data.subtitle" />

    <div class="grid gap-2 sm:grid-cols-2">
      <BaseButton class="w-full" theme="secondary" @click="closePopup"> cancel </BaseButton>

      <BaseButton class="w-full" @click="props.data.callback">
        {{ $t('popup_languages_submit-button') }}
      </BaseButton>
    </div>
  </div>
</template>
