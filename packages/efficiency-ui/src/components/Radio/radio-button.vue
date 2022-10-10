<template>
  <label
    class="ef-radio-button"
    :class="[
      modelValue === label ? 'is-active' : '',
      disabled ? 'is-disabled' : '',
      focus ? 'is-focus' : '',
      size ? `ef-radio-button-${size}` : ''
    ]"
  >
    <input
      ref="radioRef"
      v-model="modelValue"
      class="ef-radio-button__original-radio"
      :value="label"
      type="radio"
      :name="name || radioGroup?.name"
      :disabled="disabled"
      @focus="focus = true"
      @blur="focus = false"
    />
    <span
      class="ef-radio-button__inner"
      :style="modelValue === label ? activeStyle : {}"
      @keydown.stop
    >
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts" setup name="EfRadioButton">
import { computed } from 'vue';
import { useRadio } from './use-radio';
import { radioButtonProps } from './radio-button';
import type { CSSProperties } from 'vue';

const props = defineProps(radioButtonProps);

const { radioRef, focus, size, disabled, modelValue, radioGroup } =
  useRadio(props);

const activeStyle = computed<CSSProperties>(() => {
  return {
    backgroundColor: radioGroup?.fill || '',
    borderColor: radioGroup?.fill || '',
    boxShadow: radioGroup?.fill ? `-1px 0 0 0 ${radioGroup.fill}` : '',
    color: radioGroup?.textColor || ''
  };
});
</script>
