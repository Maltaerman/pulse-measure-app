<script setup lang="ts">
// import { ref } from 'vue';
import BaseThemeToggle from '@/components/bases/BaseThemeToggle.vue'
import LastMeasure from '@/components/settings/LastMeasure.vue'
import LastMeasureGraph from '@/components/settings/LastMeasureGraph.vue'
// import BaseInput from '@/components/bases/BaseInput.vue'
import BaseButton from '@/components/bases/BaseButton.vue'
// import BaseLabel from '@/components/bases/BaseLabel.vue'

// const inputModel = ref('');

function resetMeasureData() {
  console.log('resetMeasureData')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <BaseThemeToggle
      class="w-full uppercase"
      v-slot="{ theme }"
    >
      Mode / {{ theme }}
    </BaseThemeToggle>

    <BaseButton
      @click="resetMeasureData"
    >
      Reset measure data
    </BaseButton>

    <div class="grid grid-cols-2 gap-4">
      <LastMeasure class="aspect-square" />

      <LastMeasureGraph class="aspect-square"  />
    </div>

    <!-- <BaseInput
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
    </div> -->
  </div>
</template>