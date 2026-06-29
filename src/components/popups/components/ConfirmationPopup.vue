<script setup lang="ts">
import { usePopupManager } from '@/composables'

import { BaseButton, BaseIcon } from '@/components/base'

const { closePopup } = usePopupManager()

export interface IProps {
  data: {
    title: string
    subtitle: string
    submitButton: string
    cancelButton: string
    callback: () => void
  }
}

const props = withDefaults(defineProps<IProps>(), {})
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-row items-center justify-between">
      <h2 class="text-lg font-semibold text-text-primary" v-text="$t(props.data.title)" />

      <button type="button" class="cursor-pointer" @click="closePopup">
        <BaseIcon
          name="close"
          class="size-4 text-text-muted hover:text-text-primary transition-all duration-300"
        />
      </button>
    </div>

    <p class="text-left text-sm text-text-secondary" v-text="$t(props.data.subtitle)" />

    <div class="grid gap-2 sm:grid-cols-2">
      <BaseButton class="w-full" @click="props.data.callback">
        {{ $t(props.data.submitButton) }}
      </BaseButton>

      <BaseButton class="w-full sm:order-1" theme="secondary" @click="closePopup">
        {{ $t(props.data.cancelButton) }}
      </BaseButton>
    </div>
  </div>
</template>
