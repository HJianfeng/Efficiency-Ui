import type { ExtractPropTypes, PropType } from 'vue';
import type { ComponentSize } from '../../utils';
import {
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT,
  INPUT_EVENT,
  isBoolean,
  isString,
  isNumber
} from '../../utils';
import Switch from './switch.vue';
import '../../style/switch.scss';
const definePropType = <T>(val: any): PropType<T> => val;

export const switchProps = {
  modelValue: {
    type: [Boolean, String, Number],
    default: false
  },
  value: {
    type: [Boolean, String, Number],
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  width: {
    type: [String, Number],
    default: ''
  },
  inlinePrompt: {
    type: Boolean,
    default: false
  },
  activeIcon: {
    type: String,
    default: ''
  },
  inactiveIcon: {
    type: String,
    default: ''
  },
  activeText: {
    type: String,
    default: ''
  },
  inactiveText: {
    type: String,
    default: ''
  },
  activeColor: {
    type: String,
    default: ''
  },
  inactiveColor: {
    type: String,
    default: ''
  },
  activeValue: {
    type: [Boolean, String, Number],
    default: true
  },
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false
  },
  name: {
    type: String,
    default: ''
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  beforeChange: {
    type: definePropType<() => Promise<boolean> | boolean>(Function)
  },
  loading: {
    type: Boolean,
    default: false
  },
  id: { type: String },
  size: {
    type: String as PropType<ComponentSize>,
    default: ''
  },
  tabindex: {
    type: [String, Number]
  }
};

export type SwitchProps = ExtractPropTypes<typeof switchProps>;

export const switchEmits = {
  [UPDATE_MODEL_EVENT]: (val: boolean | string | number) =>
    isBoolean(val) || isString(val) || isNumber(val),
  [CHANGE_EVENT]: (val: boolean | string | number) =>
    isBoolean(val) || isString(val) || isNumber(val),
  [INPUT_EVENT]: (val: boolean | string | number) =>
    isBoolean(val) || isString(val) || isNumber(val)
};
export type SwitchEmits = typeof switchEmits;

export type SwitchInstance = InstanceType<typeof Switch>;
