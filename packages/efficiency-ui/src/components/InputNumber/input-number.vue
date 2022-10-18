<template>
  <div
    class="ef-input-number"
    :class="{
      'ef-input-disabled': disabled,
      'is-without-controls': !controls,
      'is-controls-right': controlsAtRight
    }"
    @dragstart.prevent
  >
    <span
      v-if="controls"
      v-repeat-click="decrease"
      role="button"
      class="ef-input-number__decrease"
      :class="{ 'is-disabled': minDisabled || disabled }"
      @keydown.enter="decrease"
    >
      <i
        :class="{
          'i-ic-baseline-minus': !controlsAtRight,
          'i-ic-outline-keyboard-arrow-down': controlsAtRight
        }"
      ></i>
    </span>
    <span
      v-if="controls"
      v-repeat-click="increase"
      class="ef-input-number__increase"
      role="button"
      :class="{ 'is-disabled': maxDisabled || disabled }"
      @keydown.enter="increase"
    >
      <i
        :class="{
          'i-ion-add': !controlsAtRight,
          'i-ic-round-keyboard-arrow-up': controlsAtRight
        }"
      ></i>
    </span>
    <Input
      :id="id"
      ref="input"
      type="number"
      :step="step"
      :model-value="displayValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :max="max"
      :min="min"
      :name="name"
      :label="label"
      :validate-event="false"
      @keydown.up.prevent="increase"
      @keydown.down.prevent="decrease"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @change="handleInputChange"
    />
  </div>
</template>
<script lang="ts" setup name="EfInputNumber">
import { computed, onMounted, onUpdated, reactive, ref, watch } from 'vue';
import { isNil, isNumber, isUndefined, debugWarn } from '../../utils';
import { Input } from '../Input';
import { RepeatClick as vRepeatClick } from '../../directives';
import { inputNumberEmits, inputNumberProps } from './input-number';
import type { InputInstance } from '../Input/input';
import { useFormItem } from '../../hooks';
const props = defineProps(inputNumberProps);
const emit = defineEmits(inputNumberEmits);

const { formItem } = useFormItem();
const input = ref<InputInstance>();

interface Data {
  currentValue: number | null | undefined;
  userInput: null | number | string;
}
const data = reactive<Data>({
  currentValue: props.modelValue,
  userInput: null
});

const minDisabled = computed(
  () =>
    isNumber(props.modelValue) &&
    ensurePrecision(props.modelValue, -1)! < props.min
);
const maxDisabled = computed(
  () =>
    isNumber(props.modelValue) && ensurePrecision(props.modelValue)! > props.max
);

const numPrecision = computed(() => {
  const stepPrecision = getPrecision(props.step);
  if (!isUndefined(props.precision)) {
    if (stepPrecision > props.precision) {
      console.warn(
        'InputNumber',
        'precision should not be less than the decimal places of step'
      );
    }
    return props.precision;
  } else {
    return Math.max(getPrecision(props.modelValue), stepPrecision);
  }
});
const controlsAtRight = computed(() => {
  return props.controls && props.controlsPosition === 'right';
});

const displayValue = computed(() => {
  if (data.userInput !== null) {
    return data.userInput;
  }
  let currentValue: number | string | undefined | null = data.currentValue;
  if (isNil(currentValue)) return '';
  if (isNumber(currentValue)) {
    if (Number.isNaN(currentValue)) return '';
    if (!isUndefined(props.precision)) {
      currentValue = currentValue.toFixed(props.precision);
    }
  }
  return currentValue;
});
const toPrecision = (num: number, pre?: number) => {
  if (isUndefined(pre)) pre = numPrecision.value;
  if (pre === 0) return Math.round(num);
  let snum = String(num);
  const pointPos = snum.indexOf('.');
  if (pointPos === -1) return num;
  const nums = snum.replace('.', '').split('');
  const datum = nums[pointPos + pre];
  if (!datum) return num;
  const length = snum.length;
  if (snum.charAt(length - 1) === '5') {
    snum = `${snum.slice(0, Math.max(0, length - 1))}6`;
  }
  return Number.parseFloat(Number(snum).toFixed(pre));
};
const getPrecision = (value: number | null | undefined) => {
  if (isNil(value)) return 0;
  const valueString = value.toString();
  const dotPosition = valueString.indexOf('.');
  let precision = 0;
  if (dotPosition !== -1) {
    precision = valueString.length - dotPosition - 1;
  }
  return precision;
};
const ensurePrecision = (val: number, coefficient: 1 | -1 = 1) => {
  if (!isNumber(val)) return data.currentValue;
  // Solve the accuracy problem of JS decimal calculation by converting the value to integer.
  return toPrecision(val + props.step * coefficient);
};
const increase = () => {
  if (props.disabled || maxDisabled.value) return;
  const value = props.modelValue || 0;
  const newVal = ensurePrecision(value);
  setCurrentValue(newVal);
};
const decrease = () => {
  if (props.disabled || minDisabled.value) return;
  const value = props.modelValue || 0;
  const newVal = ensurePrecision(value, -1);
  setCurrentValue(newVal);
};
const verifyValue = (
  value: number | string | null | undefined,
  update?: boolean
): number | null | undefined => {
  const { max, min, step, precision, stepStrictly } = props;
  let newVal = Number(value);
  if (isNil(value) || Number.isNaN(newVal)) {
    return null;
  }

  if (stepStrictly) {
    newVal = toPrecision(Math.round(newVal / step) * step, precision);
  }
  if (!isUndefined(precision)) {
    newVal = toPrecision(newVal, precision);
  }
  if (newVal > max || newVal < min) {
    newVal = newVal > max ? max : min;
    update && emit('update:modelValue', newVal);
  }
  return newVal;
};
const setCurrentValue = (value: number | string | null | undefined) => {
  const oldVal = data.currentValue;
  const newVal = verifyValue(value);
  if (oldVal === newVal) return;
  data.userInput = null;
  emit('update:modelValue', newVal!);
  emit('input', newVal);
  emit('change', newVal!, oldVal!);
  if (props.validateEvent) {
    formItem?.validate?.('change').catch((err) => debugWarn(err));
  }
  data.currentValue = newVal;
};
const handleInput = (value: string) => {
  return (data.userInput = value);
};
const handleInputChange = (value: string) => {
  const newVal = value !== '' ? Number(value) : '';
  if ((isNumber(newVal) && !Number.isNaN(newVal)) || value === '') {
    setCurrentValue(newVal);
  }
  data.userInput = null;
};

const focus = () => {
  input.value?.focus?.();
};

const blur = () => {
  input.value?.blur?.();
};

const handleFocus = (event: MouseEvent | FocusEvent) => {
  emit('focus', event);
};

const handleBlur = (event: MouseEvent | FocusEvent) => {
  emit('blur', event);
  if (props.validateEvent) {
    formItem?.validate?.('blur').catch((err) => debugWarn(err));
  }
};

watch(
  () => props.modelValue,
  (value) => {
    data.currentValue = verifyValue(value, true);
    data.userInput = null;
  },
  { immediate: true }
);
onMounted(() => {
  const { min, max, modelValue } = props;
  const innerInput = input.value?.input as HTMLInputElement;
  innerInput.setAttribute('role', 'spinbutton');
  if (Number.isFinite(max)) {
    innerInput.setAttribute('aria-valuemax', String(max));
  } else {
    innerInput.removeAttribute('aria-valuemax');
  }
  if (Number.isFinite(min)) {
    innerInput.setAttribute('aria-valuemin', String(min));
  } else {
    innerInput.removeAttribute('aria-valuemin');
  }
  innerInput.setAttribute('aria-valuenow', String(data.currentValue));
  innerInput.setAttribute('aria-disabled', String(props.disabled));
  if (!isNumber(modelValue) && modelValue != null) {
    let val: number | null = Number(modelValue);
    if (Number.isNaN(val)) {
      val = null;
    }
    emit('update:modelValue', val!);
  }
});
onUpdated(() => {
  const innerInput = input.value?.input;
  innerInput?.setAttribute('aria-valuenow', `${data.currentValue}`);
});
defineExpose({
  /** @description get focus the input component */
  focus,
  /** @description remove focus the input component */
  blur
});
</script>
