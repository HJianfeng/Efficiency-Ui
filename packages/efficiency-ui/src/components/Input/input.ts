import type { ExtractPropTypes } from 'vue';
import { UPDATE_MODEL_EVENT } from '../../utils/const/event';
import { isString } from '../../utils';
import type Input from './input.vue';
import { PropType, StyleValue } from 'vue';
import '@/style/input.scss';

export type InputAutoSize = { minRows?: number; maxRows?: number } | boolean;
export const inputProps = {
  modelValue: {
    type: [String, Number, Object] as PropType<any>,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  autosize: {
    type: [Object, Boolean] as PropType<InputAutoSize>,
    default: false
  },
  resize: {
    type: String,
    values: ['none', 'both', 'horizontal', 'vertical']
  },
  placeholder: {
    type: String
  },
  formatter: {
    type: Function
  },
  parser: {
    type: Function
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  tabindex: {
    type: [Number, String] as PropType<any>,
    default: 0
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: undefined
  },
  inputStyle: {
    type: [Object, Array, String] as PropType<StyleValue>,
    default: () => ({})
  }
} as const;
export type InputProps = ExtractPropTypes<typeof inputProps>;

export const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value: string) => isString(value),
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  // NOTE: when autofill by browser, the keydown event is instanceof Event, not KeyboardEvent
  keydown: (evt: KeyboardEvent | Event) => evt instanceof Event,
  compositionstart: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionupdate: (evt: CompositionEvent) => evt instanceof CompositionEvent,
  compositionend: (evt: CompositionEvent) => evt instanceof CompositionEvent
};
export type InputEmits = typeof inputEmits;

export type InputInstance = InstanceType<typeof Input>;
