export const UPDATE_MODEL_EVENT = 'update:modelValue';
export const CHANGE_EVENT = 'change';
export const INPUT_EVENT = 'input';

export const componentSizes = ['', 'default', 'small', 'large'] as const;

export type ComponentSize = typeof componentSizes[number];

export const componentSizeMap = {
  large: 40,
  default: 32,
  small: 24
} as const;

export const getComponentSize = (size?: ComponentSize) => {
  return componentSizeMap[size || 'default'];
};
