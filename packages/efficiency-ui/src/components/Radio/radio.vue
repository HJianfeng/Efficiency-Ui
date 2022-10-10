<template>
  <label
    class="ef-radio"
    :class="{
      'is-disabled': disabled,
      'is-focus': focus,
      'is-bordered': border,
      'is-checked': modelValue === label
    }"
  >
    <span
      class="ef-radio__input"
      :class="{
        'is-disabled': disabled,
        'is-checked': modelValue === label
      }"
    >
      <input
        ref="radioRef"
        v-model="modelValue"
        class="ef-radio__original"
        :value="label"
        :name="name || radioGroup?.name"
        :disabled="disabled"
        type="radio"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
      />
      <span class="ef-radio__inner" />
    </span>
    <span class="ef-radio__label" @keydown.stop>
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts" setup name="EfRadio">
import { nextTick } from 'vue';
import { radioEmits, radioProps } from './radio';
import { useRadio } from './use-radio';

const props = defineProps(radioProps);
const emit = defineEmits(radioEmits);
const { radioRef, radioGroup, focus, disabled, modelValue } = useRadio(
  props,
  emit
);
function handleChange() {
  nextTick(() => emit('change', modelValue.value));
}
</script>
