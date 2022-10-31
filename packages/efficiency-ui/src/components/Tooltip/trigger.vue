<template>
  <ef-popper-trigger
    :id="id"
    :virtual-ref="virtualRef"
    :open="open"
    :virtual-triggering="virtualTriggering"
    :class="ns.e('trigger')"
    @blur="onBlur"
    @focus="onFocus"
    @click="onClick"
    @contextmenu="onContextMenu"
    @mouseenter="onMouseenter"
    @mouseleave="onMouseleave"
    @keydown="onKeydown"
  >
    <slot />
  </ef-popper-trigger>
</template>

<script lang="ts">
import { defineComponent, inject, ref, toRef, unref } from 'vue';
import { EfPopperTrigger } from '../Popper';
import { composeEventHandlers } from '../../utils';
import { useNamespace } from '../../hooks';
import { TOOLTIP_INJECTION_KEY } from './tokens';
import { useTooltipTriggerProps } from './tooltip';
import { whenTrigger } from './utils';

import type { OnlyChildExpose } from '../Slot';

export default defineComponent({
  name: 'EfTooltipTrigger',
  components: {
    EfPopperTrigger
  },
  props: useTooltipTriggerProps,
  setup(props) {
    const ns = useNamespace('tooltip');
    const { controlled, id, open, onOpen, onClose, onToggle } = inject(
      TOOLTIP_INJECTION_KEY,
      undefined
    )!;
    const triggerRef = ref<OnlyChildExpose | null>(null);

    const stopWhenControlledOrDisabled = () => {
      if (unref(controlled) || props.disabled) {
        return true;
      }
    };
    const trigger = toRef(props, 'trigger');
    // 如果 stopWhenControlledOrDisabled() 为 false 则执行 onOpen （trigger为hover时）
    const onMouseenter = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'hover', onOpen)
    );
    const onMouseleave = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'hover', onClose)
    );
    const onClick = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'click', (e) => {
        // distinguish left click
        if ((e as MouseEvent).button === 0) {
          onToggle(e);
        }
      })
    );

    const onFocus = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'focus', onOpen)
    );

    const onBlur = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'focus', onClose)
    );

    const onContextMenu = composeEventHandlers(
      stopWhenControlledOrDisabled,
      whenTrigger(trigger, 'contextmenu', (e: Event) => {
        e.preventDefault();
        onToggle(e);
      })
    );

    const onKeydown = composeEventHandlers(
      stopWhenControlledOrDisabled,
      (e: KeyboardEvent) => {
        const { code } = e;
        if (props.triggerKeys.includes(code)) {
          e.preventDefault();
          onToggle(e);
        }
      }
    );

    return {
      onBlur,
      onContextMenu,
      onFocus,
      onMouseenter,
      onMouseleave,
      onClick,
      onKeydown,
      open,
      id,
      triggerRef,
      ns
    };
  }
});
</script>
