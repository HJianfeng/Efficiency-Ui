import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { Instance } from '@popperjs/core';

export type Measurable = {
  getBoundingClientRect: () => DOMRect;
};
export type EfPopperInjectionContext = {
  triggerRef: Ref<Measurable | undefined>;
  contentRef: Ref<HTMLElement | undefined>;
  popperInstanceRef: Ref<Instance | undefined>;
  referenceRef: Ref<Measurable | undefined>;
  role: ComputedRef<string>;
};

export type EfPopperContentInjectionContext = {
  arrowRef: Ref<HTMLElement | undefined>;
  arrowOffset: Ref<number | undefined>;
};

export const POPPER_INJECTION_KEY: InjectionKey<EfPopperInjectionContext> =
  Symbol('popper');

export const POPPER_CONTENT_INJECTION_KEY: InjectionKey<EfPopperContentInjectionContext> =
  Symbol('popperContent');
