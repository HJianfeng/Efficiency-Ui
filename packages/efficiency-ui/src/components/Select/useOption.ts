import { computed, getCurrentInstance, inject, toRaw, unref, watch } from 'vue';
import { get } from 'lodash-unified';
import { selectGroupKey, selectKey } from './token';
import { escapeStringRegexp } from '../../utils';
import type { Ref } from 'vue';
import type { QueryChangeCtx } from './token';

export function useOption(props, states) {
  const select = inject(selectKey);
  const selectGroup = inject(selectGroupKey, { disabled: false });
  //computed
  // computed
  const isObject = computed(() => {
    return (
      Object.prototype.toString.call(props.value).toLowerCase() ===
      '[object object]'
    );
  });

  const itemSelected = computed(() => {
    if (!select.props.multiple) {
      return isEqual(props.value, select.props.modelValue);
    } else {
      return contains(select.props.modelValue as unknown[], props.value);
    }
  });
  const currentValue = computed(() => {
    return props.value || props.label || '';
  });
  const currentLabel = computed(() => {
    return props.label || (isObject.value ? '' : props.value);
  });
  const limitReached = computed(() => {
    // 是否超出限制
    if (select.props.multiple) {
      const modelValue = (select.props.modelValue || []) as unknown[];
      return (
        !itemSelected.value &&
        modelValue.length >= select.props.multipleLimit &&
        select.props.multipleLimit > 0
      );
    } else {
      return false;
    }
  });
  const isDisabled = computed(() => {
    return props.disabled || states.groupDisabled || limitReached.value;
  });

  const instance = getCurrentInstance();
  // watch
  watch(
    () => selectGroup.disabled,
    () => {
      states.groupDisabled = selectGroup.disabled;
    },
    { immediate: true }
  );
  watch(
    () => currentLabel.value,
    () => {
      if (!props.created && !select.props.remote) select.setSelected();
    }
  );
  watch(
    () => props.value,
    (val, oldVal) => {
      const { remote, valueKey } = select.props;
      if (!props.created && !remote) {
        if (
          valueKey &&
          typeof val === 'object' &&
          typeof oldVal === 'object' &&
          val[valueKey] === oldVal[valueKey]
        ) {
          return;
        }
        select.setSelected();
      }
    }
  );
  // utils
  const contains = (arr = [], target) => {
    if (!isObject.value) {
      return arr && arr.includes(target);
    } else {
      const valueKey = select.props.valueKey;
      return (
        arr &&
        arr.some((item) => {
          return toRaw(get(item, valueKey)) === get(target, valueKey);
        })
      );
    }
  };
  const isEqual = (a: unknown, b: unknown) => {
    if (!isObject.value) {
      return a === b;
    } else {
      const { valueKey } = select.props;
      return get(a, valueKey) === get(b, valueKey);
    }
  };
  const hoverItem = () => {
    if (!props.disabled && !selectGroup.disabled) {
      select.hoverIndex = select.optionsArray.indexOf(instance.proxy);
    }
  };

  const { queryChange } = toRaw(select);
  watch(queryChange, (changes: Ref<QueryChangeCtx>) => {
    const { query } = unref(changes);
    // 当输入框搜索时，根据正则判断当前下拉项的 value 是否匹配，不匹配则隐藏
    const regexp = new RegExp(escapeStringRegexp(query), 'i');
    states.visible = regexp.test(currentLabel.value) || props.created;
    if (!states.visible) {
      select.filteredOptionsCount--;
    }
  });
  return {
    select,
    currentLabel,
    currentValue,
    itemSelected,
    isDisabled,
    hoverItem
  };
}
