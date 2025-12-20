<script setup lang="ts">
// import { ref } from 'vue';
import BaseThemeToggle from '@/components/bases/BaseThemeToggle.vue'
import Achievements from '@/components/settings/Achievements.vue'
import LastMeasure from '@/components/settings/LastMeasure.vue'
import LastMeasureGraph from '@/components/settings/LastMeasureGraph.vue'
// import BaseInput from '@/components/bases/BaseInput.vue'
import BaseButton from '@/components/bases/BaseButton.vue'
// import BaseLabel from '@/components/bases/BaseLabel.vue'

// const inputModel = ref('');

function resetMeasureData() {
  console.log('resetMeasureData')
}

function getPWA() {
  console.log('getPWA')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-2 gap-4">
      <p
        class="text-lg font-semibold col-span-2 text-neutral-800"
        v-text="'Achievements'"
      />

      <Achievements class="min-h-40 col-span-2" />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <p
        class="text-lg font-semibold col-span-2 text-neutral-800"
        v-text="'Last measure'"
      />

      <LastMeasure class="aspect-square" />

      <LastMeasureGraph class="aspect-square"  />
    </div>

    <BaseButton
      @click="resetMeasureData"
    >
      Reset measure data
    </BaseButton>

    <BaseButton
      @click="getPWA"
    >
      Get PWA
    </BaseButton>

    <BaseThemeToggle
      class="w-full uppercase"
      v-slot="{ theme }"
    >
      Mode / {{ theme }}
    </BaseThemeToggle>



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