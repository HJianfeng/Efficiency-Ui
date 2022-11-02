<template>
  <component
    :is="tag"
    :class="ns.b('group')"
    role="group"
    :id="groupId"
    :aria-label="!isLabeledByFormItem ? label || 'checkbox-group' : undefined"
    :aria-labelledby="isLabeledByFormItem ? elFormItem?.labelId : undefined"
  >
    <slot />
  </component>
</template>

<script setup lang="ts" name="EfCheckboxGroup">
import { computed, nextTick, provide, toRefs, watch } from 'vue';
import {
  useCheckboxGroupProps,
  checkboxGroupEmits,
  useCheckboxGroupId,
  useCheckboxGroup,
  UPDATE_MODEL_EVENT
} from './checkbox';
import type { CheckboxValueType } from './checkbox';
import { useNamespace, useSize } from '../../hooks';
import { debugWarn } from '../../utils';
const props = defineProps(useCheckboxGroupProps);
const emit = defineEmits(checkboxGroupEmits);

const ns = useNamespace('checkbox');
const checkboxGroupSize = useSize();

const { formItem } = useCheckboxGroup();
const { groupId, isLabeledByFormItem } = useCheckboxGroupId(props, {
  formItem
});

const changeEvent = (value: CheckboxValueType[]) => {
  emit(UPDATE_MODEL_EVENT, value);
  nextTick(() => {
    emit('change', value);
  });
};

const modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(val: CheckboxValueType[]) {
    changeEvent(val);
  }
});

provide('CheckboxGroup', {
  name: 'EfCheckboxGroup',
  ...toRefs(props),
  modelValue,
  checkboxGroupSize,
  changeEvent
});
watch(
  () => props.modelValue,
  () => {
    if (props.validateEvent) {
      formItem?.validate('change').catch((err) => debugWarn(err));
    }
  }
);
</script>
