<template>
  <div
    :class="[ns.b('dropdown'), ns.is('multiple', isMultiple), popperClass]"
    :style="{ [isFitInputWidth ? 'width' : 'minWidth']: minWidth }"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject, ref, onMounted } from 'vue';
import { useNamespace } from '../../hooks';
import { useResizeObserver } from '@vueuse/core';
import { selectKey } from './token';

export default defineComponent({
  name: 'EfSelectDropdown',
  componentName: 'EfSelectDropdown',
  setup() {
    const ns = useNamespace('select');
    const select = inject(selectKey);
    // computed
    const popperClass = computed(() => select.props.popperClass);
    const isMultiple = computed(() => select.props.multiple);
    const isFitInputWidth = computed(() => select.props.fitInputWidth);
    const minWidth = ref('');

    function updateMinWidth() {
      minWidth.value = `${select.selectWrapper?.offsetWidth}px`;
    }
    onMounted(() => {
      // TODO: updatePopper
      // popper.value.update()
      updateMinWidth();
      useResizeObserver(select.selectWrapper, updateMinWidth);
    });
    return {
      ns,
      minWidth,
      popperClass,
      isMultiple,
      isFitInputWidth
    };
  }
});
</script>
