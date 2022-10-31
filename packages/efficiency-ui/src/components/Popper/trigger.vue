<template>
  <!-- ef-only-child 用于限制只展示插槽的第一个子节点和添加自定义指令 -->
  <ef-only-child
    v-if="!virtualTriggering"
    v-bind="$attrs"
    :aria-controls="ariaControls"
    :aria-describedby="ariaDescribedby"
    :aria-expanded="ariaExpanded"
    :aria-haspopup="ariaHaspopup"
  >
    <slot />
  </ef-only-child>
</template>
<script lang="ts" setup name="EfPopperTrigger">
import { computed, inject, onBeforeUnmount, onMounted, watch } from 'vue';
import { EfOnlyChild } from '../Slot';
import { usePopperTriggerProps } from './trigger';
import { useForwardRef } from '../../hooks';
import { POPPER_INJECTION_KEY } from '../../token';
import { isElement, isNil } from '../../utils';
import type { WatchStopHandle } from 'vue';
import { unrefElement } from '@vueuse/core';

const props = defineProps(usePopperTriggerProps);

const { role, triggerRef } = inject(POPPER_INJECTION_KEY, undefined)!;

const ariaControls = computed<string | undefined>(() => {
  return ariaHaspopup.value ? props.id : undefined;
});
const ariaDescribedby = computed<string | undefined>(() => {
  if (role && role.value === 'tooltip') {
    return props.open && props.id ? props.id : undefined;
  }
  return undefined;
});
const ariaHaspopup = computed<string | undefined>(() => {
  if (role && role.value !== 'tooltip') {
    return role.value;
  }
  return undefined;
});
const ariaExpanded = computed<string | undefined>(() => {
  return ariaHaspopup.value ? `${props.open}` : undefined;
});

// 这个作用是把 插槽节点 通过指令赋值给 triggerRef，指令在 ef-only-child 中定义，也是ef-only-child组件两个作用之一
useForwardRef(triggerRef);

let virtualTriggerAriaStopWatch: WatchStopHandle | undefined = undefined;

onMounted(() => {
  // 监听虚拟触发的 ref
  // 使 triggerRef 设置为传入的 virtualRef
  watch(
    () => props.virtualRef,
    (virtualEl) => {
      if (virtualEl) {
        triggerRef.value = unrefElement(virtualEl as HTMLElement);
      }
    },
    {
      immediate: true
    }
  );

  watch(
    () => triggerRef.value,
    (el, prevEl) => {
      virtualTriggerAriaStopWatch?.();
      virtualTriggerAriaStopWatch = undefined;
      if (isElement(el)) {
        [
          'onMouseenter',
          'onMouseleave',
          'onClick',
          'onKeydown',
          'onFocus',
          'onBlur',
          'onContextmenu'
        ].forEach((eventName) => {
          // 注册用户监听的这几个事件到 triggerRef
          const handler = props[eventName];
          if (handler) {
            (el as HTMLElement).addEventListener(
              eventName.slice(2).toLowerCase(),
              handler
            );
            // 移除旧节点的事件
            (prevEl as HTMLElement)?.removeEventListener?.(
              eventName.slice(2).toLowerCase(),
              handler
            );
          }
        });
        virtualTriggerAriaStopWatch = watch(
          [ariaControls, ariaDescribedby, ariaHaspopup, ariaExpanded],
          (watches) => {
            [
              'aria-controls',
              'aria-describedby',
              'aria-haspopup',
              'aria-expanded'
            ].forEach((key, idx) => {
              isNil(watches[idx])
                ? el.removeAttribute(key)
                : el.setAttribute(key, watches[idx]);
            });
          },
          { immediate: true }
        );
      }
      if (isElement(prevEl)) {
        [
          'aria-controls',
          'aria-describedby',
          'aria-haspopup',
          'aria-expanded'
        ].forEach((key) => prevEl.removeAttribute(key));
      }
    },
    {
      immediate: true
    }
  );
});

onBeforeUnmount(() => {
  virtualTriggerAriaStopWatch?.();
  virtualTriggerAriaStopWatch = undefined;
});

defineExpose({
  /**
   * @description trigger element
   */
  triggerRef
});
</script>
