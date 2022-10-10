import { computed, getCurrentInstance, inject, ref, unref } from 'vue';
import type { ComputedRef } from 'vue';
import { formContextKey, formItemContextKey } from '../../token';

export const componentSizes = ['', 'default', 'small', 'large'] as const;
export type ComponentSize = typeof componentSizes[number];
export const componentSizeMap = {
  large: 40,
  default: 32,
  small: 24
} as const;

export const useProp = <T>(name: string): ComputedRef<T | undefined> => {
  const vm = getCurrentInstance()!;
  return computed(() => (vm.proxy?.$props as any)[name] ?? undefined);
};
export const useSize = (
  fallback?,
  ignore: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>> = {}
) => {
  const emptyRef = ref(undefined);

  const size = ignore.prop ? emptyRef : useProp<ComponentSize>('size');
  const form = ignore.form
    ? { size: undefined }
    : inject(formContextKey, undefined);
  const formItem = ignore.formItem
    ? { size: undefined }
    : inject(formItemContextKey, undefined);

  return computed(
    (): ComponentSize =>
      size.value || unref(fallback) || formItem?.size || form?.size || ''
  );
};

export const useDisabled = (fallback?) => {
  const disabled = useProp<boolean>('disabled');
  const form = inject(formContextKey, undefined);
  return computed(
    () => disabled.value || unref(fallback) || form?.disabled || false
  );
};
