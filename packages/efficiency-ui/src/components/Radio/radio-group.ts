import { radioEmits } from './radio';
import type { ExtractPropTypes } from 'vue';
import type RadioGroup from './radio-group.vue';

export const radioGroupProps = {
  id: {
    type: String,
    default: undefined
  },
  disabled: Boolean,
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  fill: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: undefined
  },
  textColor: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: undefined
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: ''
  }
};
export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>;

export const radioGroupEmits = radioEmits;
export type RadioGroupEmits = typeof radioGroupEmits;
export type RadioGroupInstance = InstanceType<typeof RadioGroup>;
