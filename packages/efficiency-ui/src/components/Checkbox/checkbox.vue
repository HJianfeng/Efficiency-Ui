<template>
  <component
    :is="!hasOwnLabel && isLabeledByFormItem ? 'span' : 'label'"
    :class="[
      ns.b(),
      ns.m(checkboxSize),
      ns.is('disabled', isDisabled),
      ns.is('bordered', border),
      ns.is('checked', isChecked)
    ]"
    :aria-controls="indeterminate ? controls : null"
    @click="onClickRoot"
  >
    <span
      :class="[
        ns.e('input'),
        ns.is('disabled', isDisabled),
        ns.is('checked', isChecked),
        ns.is('indeterminate', indeterminate),
        ns.is('focus', focus)
      ]"
    >
      <input
        v-if="trueLabel || falseLabel"
        :id="inputId"
        v-model="model"
        :class="ns.e('original')"
        type="checkbox"
        :name="name"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :tabindex="tabindex"
        :disabled="isDisabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
      <input
        v-else
        :id="inputId"
        v-model="model"
        :class="ns.e('original')"
        type="checkbox"
        :name="name"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :value="label"
        :tabindex="tabindex"
        :disabled="isDisabled"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
      <span :class="ns.e('inner')" />
    </span>
    <span v-if="hasOwnLabel" :class="ns.e('label')">
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </component>
</template>

<script setup lang="ts" name="EfCheckbox">
import { useSlots } from 'vue';
import { useNamespace } from '../../hooks';
import { useCheckbox, checkboxProps, checkboxEmits } from './checkbox';

const props = defineProps(checkboxProps);
defineEmits(checkboxEmits);

const slots = useSlots();
const ns = useNamespace('checkbox');
const {
  inputId,
  isLabeledByFormItem,
  isChecked,
  isDisabled,
  checkboxSize,
  hasOwnLabel,
  model,
  handleChange,
  onClickRoot,
  focus
} = useCheckbox(props, slots);
</script>
