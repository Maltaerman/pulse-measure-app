<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { LOCALES_LIST } from '@/router'

import { usePopupManager } from '@/components/popups/usePopupManager'
import BaseButton from '@/components/bases/BaseButton.vue'
import BaseIcon from '@/components/bases/BaseIcon.vue'

const { closePopup } = usePopupManager()

const router = useRouter()
const route = useRoute()

const selectedLocale = ref(route.params.locale)

const changeLanguagePath = () => {
  router.push({ params: { locale: selectedLocale.value }, query: route.query })

  closePopup()
}
</script>

<template>
  <div class="flex flex-col gap-4 p-5">
    <div class="flex flex-row items-center justify-between">
      <h2 class="text-lg font-semibold text-text-primary" v-text="'Language'" />

      <button type="button" @click="closePopup">
        <BaseIcon name="close" class="size-4 text-text-muted hover:text-text-primary transition" />
      </button>
    </div>

    <ul class="grid grid-cols-2 gap-4">
      <li v-for="{ code, flag } in LOCALES_LIST" :key="code" @click="selectedLocale = code">
        <button
          class="flex w-full flex-col items-center justify-start gap-2 justify-self-center rounded-lg p-2 can-hover:cursor-pointer shrink-0 cursor-pointer transition-all duration-300"
          :class="[
            { 'pointer-events-none': code === selectedLocale },
            code === selectedLocale ? 'bg-primary' : 'bg-transparent',
          ]"
          type="button"
        >
          <BaseIcon :name="flag" class="size-4 m-auto" />

          <p class="text-text-primary text-center" v-text="$t(`lang_name_${code}`)" />
        </button>
      </li>
    </ul>

    <BaseButton class="w-full" @click="changeLanguagePath">
      {{ $t('popup_languages_submit-button') }}
    </BaseButton>
  </div>
</template>
