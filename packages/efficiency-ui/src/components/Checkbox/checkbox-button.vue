<template>
  <label
    :class="[
      ns.b('button'),
      ns.bm('button', size),
      ns.is('disabled', isDisabled),
      ns.is('checked', isChecked),
      ns.is('focus', focus)
    ]"
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
    </span>
    <span
      v-if="$slots.default || label"
      :class="ns.be('button', 'inner')"
      :style="isChecked ? activeStyle : undefined"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts" name="EfCheckboxButton">
import { computed, useSlots } from 'vue';
import { useNamespace } from '../../hooks';
import {
  useCheckbox,
  checkboxProps,
  checkboxEmits,
  useCheckboxGroup
} from './checkbox';

const props = defineProps(checkboxProps);
defineEmits(checkboxEmits);

const slots = useSlots();
const ns = useNamespace('checkbox');
const { isChecked, isDisabled, model, handleChange, focus, size } = useCheckbox(
  props,
  slots
);

const { checkboxGroup } = useCheckboxGroup();
const activeStyle = computed(() => {
  const fillValue = checkboxGroup?.fill?.value ?? '';
  return {
    backgroundColor: fillValue,
    borderColor: fillValue,
    color: checkboxGroup?.textColor?.value ?? '',
    boxShadow: fillValue ? `-1px 0 0 0 ${fillValue}` : undefined
  };
});
</script>
