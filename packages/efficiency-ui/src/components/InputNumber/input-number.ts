import { isNil, isNumber } from '../../utils';

import type { ExtractPropTypes } from 'vue';
import type InputNumber from './input-number.vue';
import '@/style/input-number.scss';

export const UPDATE_MODEL_EVENT = 'update:modelValue';
export const CHANGE_EVENT = 'change';
export const INPUT_EVENT = 'input';
export const inputNumberProps = {
  id: {
    type: String,
    default: undefined
  },
  step: {
    type: Number,
    default: 1
  },
  stepStrictly: Boolean,
  max: {
    type: Number,
    default: Number.POSITIVE_INFINITY
  },
  min: {
    type: Number,
    default: Number.NEGATIVE_INFINITY
  },
  modelValue: Number,
  disabled: Boolean,
  controls: {
    type: Boolean,
    default: true
  },
  controlsPosition: {
    type: String,
    default: '',
    values: ['', 'right']
  },
  name: String,
  label: String,
  placeholder: String,
  precision: {
    type: Number,
    validator: (val: number) =>
      val >= 0 && val === Number.parseInt(`${val}`, 10)
  },
  validateEvent: {
    type: Boolean,
    default: true
  }
} as const;
export type InputNumberProps = ExtractPropTypes<typeof inputNumberProps>;

export const inputNumberEmits = {
  [CHANGE_EVENT]: (prev: number | undefined, cur: number | undefined) =>
    prev !== cur,
  blur: (e: FocusEvent) => e instanceof FocusEvent,
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  [INPUT_EVENT]: (val: number | null | undefined) =>
    isNumber(val) || isNil(val),
  [UPDATE_MODEL_EVENT]: (val: number | undefined) => isNumber(val) || isNil(val)
};
export type InputNumberEmits = typeof inputNumberEmits;

export type InputNumberInstance = InstanceType<typeof InputNumber>;
