import { isBoolean, isNumber, isString } from '../../utils';
import type { ExtractPropTypes } from 'vue';
import type Radio from './radio.vue';
import '@/style/radio.scss';

export const UPDATE_MODEL_EVENT = 'update:modelValue';
export const CHANGE_EVENT = 'change';

export const radioPropsBase = {
  disabled: Boolean,
  label: {
    type: [String, Number, Boolean],
    default: ''
  },
  size: {
    type: String,
    default: ''
  }
};

export const radioProps = {
  ...radioPropsBase,
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  border: Boolean
};

export const radioEmits = {
  [UPDATE_MODEL_EVENT]: (val: string | number | boolean) =>
    isString(val) || isNumber(val) || isBoolean(val),
  [CHANGE_EVENT]: (val: string | number | boolean) =>
    isString(val) || isNumber(val) || isBoolean(val)
};

export type RadioProps = ExtractPropTypes<typeof radioProps>;
export type RadioEmits = typeof radioEmits;
export type RadioInstance = InstanceType<typeof Radio>;
