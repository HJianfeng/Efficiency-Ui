import {
  computed,
  inject,
  ref,
  getCurrentInstance,
  toRaw,
  nextTick,
  watch
} from 'vue';
import { isBoolean, isNumber, isString, isArray, debugWarn } from '../../utils';
import type Checkbox from './checkbox.vue';
import { useFormItem, useSize, useFormItemInputId } from '../../hooks';
import type {
  ComponentInternalInstance,
  ExtractPropTypes,
  PropType
} from 'vue';
import '@/style/checkbox.scss';
import '@/style/checkbox-group.scss';
import '@/style/checkbox-button.scss';

export const UPDATE_MODEL_EVENT = 'update:modelValue';
const componentSizes = ['', 'default', 'small', 'large'] as const;
export const useCheckboxGroupProps = {
  modelValue: {
    type: Array as PropType<Array<string | number>>,
    default: () => []
  },
  disabled: Boolean,
  min: {
    type: Number,
    default: undefined
  },
  max: {
    type: Number,
    default: undefined
  },
  size: {
    type: String,
    values: componentSizes
  },
  id: {
    type: String,
    default: undefined
  },
  label: {
    type: String,
    default: undefined
  },
  fill: {
    type: String,
    default: undefined
  },
  textColor: {
    type: String,
    default: undefined
  },
  tag: {
    type: String,
    default: 'div'
  },
  validateEvent: {
    type: Boolean,
    default: true
  }
};

export type IUseCheckboxGroupProps = ExtractPropTypes<
  typeof useCheckboxGroupProps
>;

export const checkboxProps = {
  modelValue: {
    type: [Number, String, Boolean],
    default: () => undefined
  },
  label: {
    type: [String, Boolean, Number, Object]
  },
  indeterminate: Boolean,
  disabled: Boolean,
  checked: Boolean,
  name: {
    type: String,
    default: undefined
  },
  trueLabel: {
    type: [String, Number],
    default: undefined
  },
  falseLabel: {
    type: [String, Number],
    default: undefined
  },
  id: {
    type: String,
    default: undefined
  },
  border: Boolean,
  size: {
    type: String,
    values: componentSizes
  },
  tabindex: [String, Number],
  validateEvent: {
    type: Boolean,
    default: true
  }
};

export type CheckboxValueType = string | number | boolean;
export const checkboxEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxValueType) =>
    isString(val) || isNumber(val) || isBoolean(val),
  change: (val: CheckboxValueType) =>
    isString(val) || isNumber(val) || isBoolean(val)
};
export const checkboxGroupEmits = {
  [UPDATE_MODEL_EVENT]: (val: CheckboxValueType[]) => isArray(val),
  change: (val: CheckboxValueType[]) => isArray(val)
};

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;
export type CheckboxInstance = InstanceType<typeof Checkbox>;
export type CheckboxEmits = typeof checkboxEmits;

// hook
export const useCheckboxGroup = () => {
  const { form, formItem } = useFormItem();
  const checkboxGroup = inject<any>('CheckboxGroup', {});
  const isGroup = computed(
    () => checkboxGroup && checkboxGroup?.name === 'EfCheckboxGroup'
  );
  const formItemSize = computed(() => formItem?.size);

  return {
    isGroup,
    checkboxGroup,
    form,
    formItemSize,
    formItem
  };
};
const useDisabled = (props: CheckboxProps, { model, isChecked }) => {
  const { form, isGroup, checkboxGroup } = useCheckboxGroup();
  const isLimitDisabled = computed(() => {
    const min = checkboxGroup?.min?.value;
    const max = checkboxGroup?.max?.value;
    return (
      (!!(max || min) && model!.value.length >= max && !isChecked!.value) ||
      (model!.value.length <= min && isChecked!.value)
    );
  });
  const isDisabled = computed(() => {
    const disabled = props.disabled || form?.disabled;
    return isGroup.value
      ? checkboxGroup.disabled?.value || disabled || isLimitDisabled.value
      : disabled;
  });
  return {
    isDisabled,
    isLimitDisabled
  };
};
export const useCheckboxGroupId = (
  props: IUseCheckboxGroupProps,
  { formItem }: Partial<ReturnType<typeof useCheckboxGroup>>
) => {
  const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(props, {
    formItemContext: formItem
  });

  return {
    isLabeledByFormItem,
    groupId
  };
};
const useModel = (props: CheckboxProps) => {
  const selfModel = ref<any>(false); // 没有传 modelValue 时，用这个
  const isLimitExceeded = ref(false);
  const { emit } = getCurrentInstance()!;
  const { isGroup, checkboxGroup, formItem } = useCheckboxGroup();

  const model = computed({
    get() {
      return isGroup.value
        ? checkboxGroup.modelValue?.value
        : props.modelValue ?? selfModel;
    },
    set(val: unknown) {
      if (isGroup.value && Array.isArray(val)) {
        isLimitExceeded.value =
          checkboxGroup.max !== undefined &&
          val.length > checkboxGroup.max.value;
        isLimitExceeded.value === false && checkboxGroup?.changeEvent?.(val);
      } else {
        emit(UPDATE_MODEL_EVENT, val);
        selfModel.value = val;
      }
    }
  });
  return {
    model,
    isGroup,
    isLimitExceeded,
    FormItem: formItem
  };
};
const useCheckboxStatus = (
  props: CheckboxProps,
  slots: ComponentInternalInstance['slots'],
  { model }: Partial<ReturnType<typeof useModel>>
) => {
  const { isGroup, checkboxGroup } = useCheckboxGroup();
  const focus = ref(false);
  const size = useSize(checkboxGroup?.checkboxGroupSize, { prop: true });
  const isChecked = computed<boolean>(() => {
    const value = model!.value;
    if (Object.prototype.toString.call(value) === '[object Boolean]') {
      return value;
    } else if (Array.isArray(value)) {
      return value.map(toRaw).includes(props.label);
    } else if (value !== null && value !== undefined) {
      return value === props.trueLabel;
    } else {
      return !!value;
    }
  });
  const checkboxSize = useSize(
    computed(() =>
      isGroup.value ? checkboxGroup?.checkboxGroupSize?.value : undefined
    )
  );

  const hasOwnLabel = computed<boolean>(() => {
    // 是否有传 label 或者 默认插槽
    return !!(slots.default || props.label);
  });

  return {
    isChecked,
    focus,
    size,
    checkboxSize,
    hasOwnLabel
  };
};
const setStoreValue = (
  props: CheckboxProps,
  { model }: Partial<ReturnType<typeof useModel>>
) => {
  function addToStore() {
    if (Array.isArray(model!.value) && !model!.value.includes(props.label)) {
      model!.value.push(props.label);
    } else {
      model!.value = props.trueLabel || true;
    }
  }
  props.checked && addToStore();
};

const useEvent = (
  props: CheckboxProps,
  {
    model,
    isLimitExceeded,
    hasOwnLabel,
    isDisabled,
    isLabeledByFormItem
  }: Partial<
    ReturnType<typeof useModel> &
      ReturnType<typeof useCheckboxStatus> &
      ReturnType<typeof useDisabled> &
      ReturnType<typeof useFormItemInputId>
  >
) => {
  const { formItem, checkboxGroup } = useCheckboxGroup();
  const { emit } = getCurrentInstance()!;

  function getLabeledValue(value: string | number | boolean) {
    return value === props.trueLabel || value === true
      ? props.trueLabel ?? true
      : props.falseLabel ?? false;
  }

  function emitChangeEvent(
    checked: string | number | boolean,
    e: InputEvent | MouseEvent
  ) {
    emit('change', getLabeledValue(checked), e);
  }

  function handleChange(e: Event) {
    if (isLimitExceeded!.value) return;
    const target = e.target as HTMLInputElement;
    emit('change', getLabeledValue(target.checked), e);
  }

  async function onClickRoot(e: MouseEvent) {
    if (isLimitExceeded!.value) return;
    if (
      !hasOwnLabel!.value &&
      !isDisabled!.value &&
      isLabeledByFormItem!.value
    ) {
      model!.value = getLabeledValue(
        [false, props.falseLabel].includes(model!.value)
      );
      await nextTick();
      emitChangeEvent(model!.value, e);
    }
  }

  const validateEvent = computed(
    () => checkboxGroup.validateEvent?.value || props.validateEvent
  );

  watch(
    () => props.modelValue,
    () => {
      if (validateEvent.value) {
        formItem?.validate('change').catch((err) => debugWarn(err));
      }
    }
  );

  return {
    handleChange,
    onClickRoot
  };
};
export const useCheckbox = (
  props: CheckboxProps,
  slots: ComponentInternalInstance['slots']
) => {
  const { model, isGroup, isLimitExceeded, FormItem } = useModel(props);
  const { focus, size, isChecked, checkboxSize, hasOwnLabel } =
    useCheckboxStatus(props, slots, {
      model
    });
  const { isDisabled } = useDisabled(props, { model, isChecked });
  const { inputId, isLabeledByFormItem } = useFormItemInputId(props, {
    formItemContext: FormItem,
    disableIdGeneration: hasOwnLabel,
    disableIdManagement: isGroup
  });
  const { handleChange, onClickRoot } = useEvent(props, {
    model,
    isLimitExceeded,
    hasOwnLabel,
    isDisabled,
    isLabeledByFormItem
  });

  setStoreValue(props, { model });

  return {
    FormItem,
    inputId,
    isLabeledByFormItem,
    isChecked,
    isDisabled,
    isGroup,
    checkboxSize,
    hasOwnLabel,
    model,
    handleChange,
    onClickRoot,
    focus,
    size
  };
};
