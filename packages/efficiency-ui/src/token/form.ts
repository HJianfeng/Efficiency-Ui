import type {
  RuleItem,
  ValidateError,
  ValidateFieldsError
} from 'async-validator';
import type { SetupContext, UnwrapRef } from 'vue';
import type {
  FormEmits,
  FormItemProps,
  FormItemValidateState,
  FormLabelWidthContext,
  FormProps
} from '../components/Form';
export const formContextKey = Symbol('formContextKey');
export const formItemContextKey = Symbol('formItemContextKey');

export const componentSizes = ['', 'default', 'small', 'large'] as const;
export type FormValidationResult = Promise<boolean>;
export type FormValidateCallback = Function;
export type ComponentSize = typeof componentSizes[number];
export interface FormItemContext extends FormItemProps {
  $el: HTMLDivElement | undefined;
  size: ComponentSize;
  validateState: FormItemValidateState;
  isGroup: boolean;
  labelId: string;
  inputIds: string[];
  addInputId: Function;
  removeInputId: Function;
  validate: Function;
  resetField(): void;
  clearValidate(): void;
}
export interface FormValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}
export type Arrayable<T> = T | T[];
export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>;
}
export type FormRules = Partial<Record<string, Arrayable<FormItemRule>>>;

export type FormContext = FormProps &
  UnwrapRef<FormLabelWidthContext> & {
    emit: SetupContext<FormEmits>['emit'];

    // expose
    addField: Function;
    removeField: Function;
    resetFields: Function;
    clearValidate: Function;
    validateField: Function;
  };
