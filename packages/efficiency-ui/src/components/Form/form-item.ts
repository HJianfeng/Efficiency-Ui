import type { ExtractPropTypes, PropType } from 'vue';
import type { FormItemRule } from '../../token';
import '../../style/form.scss';

const definePropType = <T>(val: any): PropType<T> => val;
type Arrayable<T> = T | T[];
const componentSizes = ['', 'default', 'small', 'large'] as const;
export const formItemValidateStates = [
  '',
  'error',
  'validating',
  'success'
] as const;
export type FormItemValidateState = typeof formItemValidateStates[number];

export type FormItemProp = Arrayable<string>;

export const formItemProps = {
  label: String,
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  prop: {
    type: definePropType<FormItemProp>([String, Array])
  },
  required: {
    type: Boolean,
    default: undefined
  },
  rules: {
    type: definePropType<Arrayable<FormItemRule>>([Object, Array])
  },
  error: String,
  validateStatus: {
    type: String,
    values: formItemValidateStates
  },
  for: String,
  inlineMessage: {
    type: [String, Boolean],
    default: ''
  },
  showMessage: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    values: componentSizes
  }
};
export type FormItemProps = ExtractPropTypes<typeof formItemProps>;
