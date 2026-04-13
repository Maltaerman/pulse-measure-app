<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { i18n } from '@/plugins/i18n'

import { LOCALES_LIST } from '@/router'

import { usePopupManager } from '@/components/popups/usePopupManager'

import BaseButton from '@/components/bases/BaseButton.vue'
import BaseIcon from '@/components/bases/BaseIcon.vue'

const router = useRouter()
const route = useRoute()

const { closePopup } = usePopupManager()

const selectedLocale = ref(route.params.locale)

function changeLanguagePath() {
  i18n.global.locale.value = selectedLocale.value as string

  router.push({ params: { locale: selectedLocale.value }, query: route.query })

  closePopup()
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-row items-center justify-between">
      <h2 class="text-lg font-semibold text-text-primary" v-text="$t('popup_language_title')" />

      <button type="button" class="cursor-pointer" @click="closePopup">
        <BaseIcon
          name="close"
          class="size-4 text-text-muted hover:text-text-primary transition-all duration-300"
        />
      </button>
    </div>

    <ul class="grid grid-cols-2 gap-4">
      <li v-for="code in LOCALES_LIST" :key="code" @click="selectedLocale = code">
        <button
          class="flex w-full flex-col items-center justify-start gap-2 justify-self-center rounded-lg p-2 can-hover:cursor-pointer shrink-0 cursor-pointer transition-all duration-300"
          :class="{
            'pointer-events-none': code === selectedLocale,
            'bg-primary': code === selectedLocale,
          }"
          type="button"
        >
          <BaseIcon :name="`colored-flag-${code}`" class="size-4 m-auto" />

          <p class="text-text-primary font-normal text-center" v-text="$t(`global_lang_${code}`)" />
        </button>
      </li>
    </ul>

    <BaseButton class="w-full" @click="changeLanguagePath">
      {{ $t('popup_language_submit') }}
    </BaseButton>
  </div>
</template>
