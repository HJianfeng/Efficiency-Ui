import { computed, ref } from 'vue';
import { useGlobalConfig } from '../';

const zIndex = ref(0);

// 使新出现的浮动元素的层级比旧出现的高
export const useZIndex = () => {
  const initialZIndex = useGlobalConfig('zIndex', 2000);
  const currentZIndex = computed(() => initialZIndex.value + zIndex.value);

  const nextZIndex = () => {
    zIndex.value++;
    return currentZIndex.value;
  };

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex
  };
};
