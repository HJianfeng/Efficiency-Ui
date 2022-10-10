import { radioPropsBase } from './radio';
import type { ExtractPropTypes } from 'vue';
import type RadioButton from './radio-button.vue';

export const radioButtonProps = {
  ...radioPropsBase,
  name: {
    type: String,
    default: ''
  }
};

export type RadioButtonProps = ExtractPropTypes<typeof radioButtonProps>;
export type RadioButtonInstance = InstanceType<typeof RadioButton>;
