import { isArray, isBoolean, isString } from '../../utils';
import type { ExtractPropTypes, PropType } from 'vue';
import type { FormItemProp } from './form-item';
import type { FormRules } from '../../token';
import '../../style/form.scss';
const definePropType = <T>(val: any): PropType<T> => val;
const componentSizes = ['', 'default', 'small', 'large'] as const;
export const formProps = {
  model: Object,
  rules: {
    type: definePropType<FormRules>(Object)
  },
  labelPosition: {
    type: String,
    values: ['left', 'right', 'top'],
    default: 'right'
  },
  requireAsteriskPosition: {
    type: String,
    values: ['left', 'right'],
    default: 'left'
  },
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  labelSuffix: {
    type: String,
    default: ''
  },
  inline: Boolean,
  inlineMessage: Boolean,
  statusIcon: Boolean,
  showMessage: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    values: componentSizes
  },
  disabled: Boolean,
  validateOnRuleChange: {
    type: Boolean,
    default: true
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: false
  },
  scrollToError: Boolean
};
export type FormProps = ExtractPropTypes<typeof formProps>;

export const formEmits = {
  validate: (prop: FormItemProp, isValid: boolean, message: string) =>
    (isArray(prop) || isString(prop)) && isBoolean(isValid) && isString(message)
};
export type FormEmits = typeof formEmits;
