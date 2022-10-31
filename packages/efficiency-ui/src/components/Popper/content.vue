<template>
  <div ref="popperContentRef" :class="contentClass" :style="contentStyle">
    <ef-focus-trap
      :trapped="trapped"
      :trap-on-focus-in="true"
      :focus-trap-el="popperContentRef"
      :focus-start-el="focusStartRef"
      @focus-after-trapped="onFocusAfterTrapped"
      @focus-after-released="onFocusAfterReleased"
      @focusin="onFocusInTrap"
      @focusout-prevented="onFocusoutPrevented"
      @release-requested="onReleaseRequested"
    >
      <slot />
    </ef-focus-trap>
  </div>
</template>
<script lang="ts" setup name="EfPopperContent">
import {
  computed,
  inject,
  onBeforeMount,
  onMounted,
  provide,
  ref,
  toRefs,
  unref,
  watch
} from 'vue';
import { usePopperContentEmits, usePopperContentProps } from './content';
import {
  POPPER_INJECTION_KEY,
  POPPER_CONTENT_INJECTION_KEY
} from '../../token';
import { unrefElement } from '@vueuse/core';
import { useNamespace, useZIndex } from '../../hooks';
import { buildPopperOptions } from './utils';
import { createPopper } from '@popperjs/core';
import { EfFocusTrap } from '../FocusTrap';
import { isElement, isNil } from '../../utils';

import type { WatchStopHandle } from 'vue';

const props = defineProps(usePopperContentProps);
const emit = defineEmits(usePopperContentEmits);

const { popperInstanceRef, contentRef, triggerRef, role } = inject(
  POPPER_INJECTION_KEY,
  undefined
);
const { nextZIndex } = useZIndex();
const ns = useNamespace('popper');
const popperContentRef = ref<HTMLElement>();
const focusStartRef = ref<string | HTMLElement>('first');

// 定义箭头节点和距离
const arrowRef = ref<HTMLElement>();
const arrowOffset = ref<number>();
provide(POPPER_CONTENT_INJECTION_KEY, {
  arrowRef,
  arrowOffset
});

const contentZIndex = ref<number>(props.zIndex || nextZIndex());
const trapped = ref<boolean>(false);
let triggerTargetAriaStopWatch: WatchStopHandle | undefined = undefined;

const contentClass = computed(() => [
  ns.b(),
  ns.is('pure', props.pure),
  ns.is(props.effect),
  props.popperClass
]);
const ariaModal = computed<string | undefined>(() => {
  return role && role.value === 'dialog' ? 'false' : undefined;
});
const contentStyle = computed(
  () => [{ zIndex: unref(contentZIndex) }, props.popperStyle] as any
);
const computedReference = computed(
  () => unrefElement(props.referenceEl) || unref(triggerRef)
);
// 创建 popper 实例
const createPopperInstance = ({ referenceEl, popperContentEl, arrowEl }) => {
  const options: any = buildPopperOptions(props, {
    arrowEl,
    arrowOffset: unref(arrowOffset)
  });

  return createPopper(referenceEl, popperContentEl, options);
};

const updatePopper = (shouldUpdateZIndex = true) => {
  unref(popperInstanceRef)?.update();
  shouldUpdateZIndex && (contentZIndex.value = props.zIndex || nextZIndex());
};

const togglePopperAlive = () => {
  const monitorable = { name: 'eventListeners', enabled: props.visible };
  unref(popperInstanceRef)?.setOptions?.((options) => ({
    ...options,
    modifiers: [...(options.modifiers || []), monitorable]
  }));
  updatePopper(false);
  if (props.visible && props.focusOnShow) {
    trapped.value = true;
  } else if (props.visible === false) {
    trapped.value = false;
  }
};

const onFocusAfterTrapped = () => {
  emit('focus');
};

const onFocusAfterReleased = () => {
  focusStartRef.value = 'first';
  emit('blur');
};

const onFocusInTrap = (event: FocusEvent) => {
  if (props.visible && !trapped.value) {
    if (event.target) {
      focusStartRef.value = event.target as typeof focusStartRef.value;
    }
    trapped.value = true;
    if (event.relatedTarget) {
      (event.relatedTarget as HTMLElement)?.focus();
    }
  }
};

const onFocusoutPrevented = () => {
  if (!props.trapping) {
    trapped.value = false;
  }
};

const onReleaseRequested = () => {
  trapped.value = false;
  emit('close');
};

onMounted(() => {
  let updateHandle: WatchStopHandle;
  watch(
    computedReference,
    (referenceEl) => {
      updateHandle?.();
      const popperInstance = unref(popperInstanceRef);
      popperInstance?.destroy?.();
      if (referenceEl) {
        const popperContentEl = unref(popperContentRef)!;
        contentRef.value = popperContentEl;

        popperInstanceRef.value = createPopperInstance({
          referenceEl,
          popperContentEl,
          arrowEl: unref(arrowRef)
        });

        updateHandle = watch(
          () => referenceEl.getBoundingClientRect(),
          () => updatePopper(),
          {
            immediate: true
          }
        );
      } else {
        popperInstanceRef.value = undefined;
      }
    },
    {
      immediate: true
    }
  );

  watch(
    () => props.triggerTargetEl,
    (triggerTargetEl, prevTriggerTargetEl) => {
      triggerTargetAriaStopWatch?.();
      triggerTargetAriaStopWatch = undefined;

      const el = unref(triggerTargetEl || popperContentRef.value);
      const prevEl = unref(prevTriggerTargetEl || popperContentRef.value);

      if (isElement(el)) {
        const { ariaLabel, id } = toRefs(props);
        triggerTargetAriaStopWatch = watch(
          [role, ariaLabel, ariaModal, id],
          (watches) => {
            ['role', 'aria-label', 'aria-modal', 'id'].forEach((key, idx) => {
              isNil(watches[idx])
                ? el.removeAttribute(key)
                : el.setAttribute(key, watches[idx]);
            });
          },
          { immediate: true }
        );
      }
      if (isElement(prevEl)) {
        ['role', 'aria-label', 'aria-modal', 'id'].forEach((key) => {
          prevEl.removeAttribute(key);
        });
      }
    },
    { immediate: true }
  );

  watch(() => props.visible, togglePopperAlive, { immediate: true });

  watch(
    () =>
      buildPopperOptions(props, {
        arrowEl: unref(arrowRef),
        arrowOffset: unref(arrowOffset)
      }),
    (option: any) => popperInstanceRef.value?.setOptions(option)
  );
});

onBeforeMount(() => {
  triggerTargetAriaStopWatch?.();
  triggerTargetAriaStopWatch = undefined;
});

defineExpose({
  /**
   * @description popper content element
   */
  popperContentRef,
  /**
   * @description popperjs instance
   */
  popperInstanceRef,
  /**
   * @description method for updating popper
   */
  updatePopper,

  /**
   * @description content style
   */
  contentStyle
});
</script>
