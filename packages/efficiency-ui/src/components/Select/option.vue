<template>
  <li
    v-show="visible"
    :class="[
      ns.be('dropdown', 'item'),
      ns.is('disabled', isDisabled),
      {
        selected: itemSelected,
        hover
      }
    ]"
    @mouseenter="hoverItem"
    @click.stop="selectOptionClick"
  >
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>
  </li>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  getCurrentInstance,
  onBeforeUnmount,
  nextTick
} from 'vue';
import { useNamespace } from '../../hooks';
import { useOption } from './useOption';
import type { SelectOptionProxy } from './token';
export default defineComponent({
  name: 'EfOption',
  componentName: 'EfOption',
  props: {
    value: {
      required: true,
      type: [String, Number, Boolean, Object]
    },
    label: [String, Number],
    created: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const ns = useNamespace('select');
    const states = reactive({
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false,
      hover: false
    });
    const { currentLabel, itemSelected, isDisabled, select, hoverItem } =
      useOption(props, states);

    const { visible, hover } = toRefs(states);
    const vm = getCurrentInstance().proxy; // 当前组件实例
    const key = (vm as unknown as SelectOptionProxy).value; // 当前下拉项的value
    select.onOptionCreate(vm as unknown as SelectOptionProxy); // 在 select 组件的 options 属性中新增一条
    onBeforeUnmount(() => {
      const { selected } = select;
      const selectedOptions = select.props.multiple ? selected : [selected];
      const doesSelected = selectedOptions.some((item) => {
        // 当前下拉项是否被选中
        return item.value === (vm as unknown as SelectOptionProxy).value;
      });
      // if option is not selected, remove it from cache
      nextTick(() => {
        if (select.cachedOptions.get(key) === vm && !doesSelected) {
          select.cachedOptions.delete(key);
        }
      });
      select.onOptionDestroy(key, vm);
    });
    function selectOptionClick() {
      if (props.disabled !== true && states.groupDisabled !== true) {
        select.handleOptionSelect(vm, true);
      }
    }
    return {
      ns,
      currentLabel,
      itemSelected,
      isDisabled,
      select,
      hoverItem,
      visible,
      hover,
      selectOptionClick,
      states
    };
  }
});
</script>
