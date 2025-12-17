<script setup lang="ts">
import { ref } from 'vue';

import BaseThemeToggle from '@/components/bases/BaseThemeToggle.vue'
import BaseInput from '@/components/bases/BaseInput.vue'
import BaseButton from '@/components/bases/BaseButton.vue'
import BaseLabel from '@/components/bases/BaseLabel.vue'

const inputModel = ref('');
</script>

<template>
  <div class="flex flex-col gap-10">
    <BaseThemeToggle
      class="w-full"
      v-slot="{ theme }"
    >
      Theme: {{ theme }}
    </BaseThemeToggle>

        <BaseInput
      label="label"
      class="mx-10"
      v-model="inputModel"
      placeholder="Placeholder"
      :errors="[{ message: 'Error message' }]"
    />

    <div class="m-4 flex flex-col gap-4 w-fit">
      <BaseButton
        class="w-fit"
      >
        BaseButton 1
      </BaseButton>

      <BaseButton
        theme="secondary"
        size="lg"
        class="w-fit"        
      >
        BaseButton 2
      </BaseButton>

      <BaseButton
        theme="secondary"
        size="lg"
        class="w-fit"
        is-loading
      >
        BaseButton 3
      </BaseButton>
    </div>

    <div class="m-4 flex flex-col gap-4 w-fit">
      <BaseLabel
        size="md"
      >
        BaseLabel
      </BaseLabel>

      <BaseLabel
        theme="green"
        size="lg"
        class="w-fit"
      >
        BaseLabel
      </BaseLabel>
    </div>
  </div>
</template>