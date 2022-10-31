<template>
  <slot />
</template>

<script lang="ts" setup name="EFPopperRoot">
import { computed, provide, ref } from 'vue';
import { POPPER_INJECTION_KEY } from '../../token';
import { usePopperProps } from './popper';

import type { Instance as PopperInstance } from '@popperjs/core';
import type { EfPopperInjectionContext } from '../../token';

const props = defineProps(usePopperProps);

const triggerRef = ref<HTMLElement>();
const popperInstanceRef = ref<PopperInstance>();
const contentRef = ref<HTMLElement>();
const referenceRef = ref<HTMLElement>();
const role = computed(() => props.role);

const popperProvides = {
  /**
   * @description trigger element
   */
  triggerRef,
  /**
   * @description popperjs instance
   */
  popperInstanceRef,
  /**
   * @description popper content element
   */
  contentRef,
  /**
   * @description popper reference element
   */
  referenceRef,
  /**
   * @description role determines how aria attributes are distributed
   */
  role
} as EfPopperInjectionContext;
provide(POPPER_INJECTION_KEY, popperProvides);
</script>
