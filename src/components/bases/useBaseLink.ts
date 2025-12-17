import { computed, type Ref } from 'vue';


// TODO: add logic
export function useLink(propsData: Ref<any>) {
  const to = computed(() => propsData.value.to ?? null);

  return { to, isActive: false };
}
