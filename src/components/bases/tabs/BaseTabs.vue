<script setup lang="ts">
import {
  ref,
  computed,
  watchEffect,
  onMounted,
  onBeforeUnmount,
  useTemplateRef,
} from 'vue';

import BaseTab from './BaseTab.vue';

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },

  activeTabId: {
    type: [String, Number],
    default: '',
  },

  theme: {
    type: String,
    default: 'primary',
    validator: (theme: string) => ['primary', 'light', 'transparent'].includes(theme),
  },

  size: {
    type: String,
    default: 'md',
    validator: (size: string) => ['md'].includes(size),
  },

  target: {
    type: String,
    default: '',
  },

  isScrollHidden: {
    type: Boolean,
    default: true,
  },

  shouldTranslate: {
    type: Boolean,
    default: true,
  },


  iconPosition: {
    type: String,
    default: 'left',
    validator: (position: string) => ['left', 'right'].includes(position),
  },

  iconRotate: {
    type: String,
    default: '',
  },

  iconFormat: {
    type: String,
    default: 'svg',
    validator: (format) => ['svg', 'webp', 'png'].includes(format),
  },

  listId: {
    type: String,
    default: '',
  },

  focusAfterRotation: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['change-active-tab']);

const tabId = ref(props.activeTabId || '');

const tabRefs = useTemplateRef('tabRefs');
const containerRef = useTemplateRef('containerRef');

function scrollToActiveTab() {
  if (!tabRefs.value) return;

  const activeTab = tabRefs.value.find(({ id }) => id === String(tabId.value));
}

const BORDER_COLOR_MAP = {
  primary: 'border-neutral-500',
  light: 'border-neutral-300',
  transparent: 'border-0',
};

const borderColorClass = computed(() => BORDER_COLOR_MAP[props.theme]);

const BG_COLOR_MAP = {
  primary: 'bg-neutral-600',
  light: 'bg-light',
  transparent: 'bg-transparent',
};

const bgColorClass = computed(() => BG_COLOR_MAP[props.theme]);

const HEIGHT_MAP = {
  primary: 'h-10',
  light: 'h-10',
  transparent: '',
};

const heightClass = computed(() => HEIGHT_MAP[props.theme]);

const GAP_MAP = {
  primary: 'gap-1',
  light: 'gap-1',
  transparent: 'gap-5',
};

const gapClass = computed(() => GAP_MAP[props.theme]);

const PADDING_MAP = {
  primary: 'px-[3px]',
  light: 'px-[3px]',
  transparent: '',
};

const paddingsClass = computed(() => PADDING_MAP[props.theme]);

watchEffect(() => {
  tabId.value = props.activeTabId;

  scrollToActiveTab();
});

function onChangeTab(id, idx) {
  if (id) tabId.value = id;

  scrollToActiveTab();

  emit('change-active-tab', { id, idx });
}

function onOrientationChange() {
  if (!props.focusAfterRotation) return;

  window.setTimeout(scrollToActiveTab, 100);
}

onMounted(() =>
  window.addEventListener('orientationchange', onOrientationChange)
);

onBeforeUnmount(() =>
  window.removeEventListener('orientationchange', onOrientationChange)
);
</script>

<template>
  <nav
    ref="containerRef"
    class="relative -mb-3 overflow-scroll pb-3"
    :class="{ noScrollbar: props.isScrollHidden }"
  >
    <ul
      :id="props.listId"
      class="relative flex w-full flex-row items-center"
      :class="[
        borderColorClass,
        bgColorClass,
        heightClass,
        gapClass,
        paddingsClass,
      ]"
    >
      <li
        v-for="({ id, label, iconName }, index) in props.tabs"
        :id="id"
        :key="id"
        ref="tabRefs"
        class="w-full"
      >
        <BaseTab
          :icon-format="props.iconFormat"
          :icon-name="iconName"
          :icon-position="props.iconPosition"
          :icon-rotate="props.iconRotate"
          :is-active="tabId === id"
          :label="label"
          :size="props.size"
          :theme="props.theme"
          class="w-full rounded-sm"
          @set-tab="onChangeTab(id, index)"
        >
          {{ label }}
        </BaseTab>
      </li>
    </ul>
  </nav>
</template>
