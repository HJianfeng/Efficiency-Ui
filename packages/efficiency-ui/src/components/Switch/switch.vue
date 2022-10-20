<template>
  <div
    :class="[
      ns.b(),
      ns.m(switchSize),
      ns.is('disabled', switchDisabled),
      ns.is('checked', checked)
    ]"
    :styles="styles"
    @click.prevent="switchValue"
  >
    <input
      :id="inputId"
      ref="input"
      :class="ns.e('input')"
      type="checkbox"
      role="switch"
      :aria-checked="checked"
      :aria-disabled="switchDisabled"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="switchDisabled"
      :name="name"
      @change="handleChange"
      @keydown.enter="switchValue"
    />
    <span
      v-if="!inlinePrompt && (inactiveIcon || inactiveText)"
      :class="[
        ns.e('label'),
        ns.em('label', 'left'),
        ns.is('active', !checked)
      ]"
    >
      <i v-if="inactiveIcon" :class="inactiveIcon"></i>
      <span v-if="!inactiveIcon && inactiveText" :aria-hidden="checked">{{
        inactiveText
      }}</span>
    </span>
    <span ref="core" :class="ns.e('core')" :style="coreStyle">
      <div v-if="inlinePrompt" :class="ns.e('inner')">
        <!-- 内联图标展示 -->
        <template v-if="activeIcon || inactiveIcon">
          <i
            v-if="activeIcon"
            :class="[
              activeIcon,
              ns.is('icon'),
              checked ? ns.is('show') : ns.is('hide')
            ]"
          ></i>
          <i
            v-if="inactiveIcon"
            :class="[
              inactiveIcon,
              ns.is('icon'),
              !checked ? ns.is('show') : ns.is('hide')
            ]"
          ></i>
        </template>
        <!-- 内联文字展示 -->
        <template v-else-if="activeText || inactiveIcon">
          <span
            v-if="activeText"
            :class="[ns.is('text'), checked ? ns.is('show') : ns.is('hide')]"
            :aria-hidden="!checked"
          >
            {{ activeText.substring(0, 3) }}
          </span>
          <span
            v-if="inactiveText"
            :class="[ns.is('text'), !checked ? ns.is('show') : ns.is('hide')]"
            :aria-hidden="checked"
          >
            {{ inactiveText.substring(0, 3) }}
          </span>
        </template>
      </div>
      <div :class="ns.e('action')">
        <i
          v-if="loading"
          :class="['i-line-md-loading-alt-loop', ns.is('loading')]"
        ></i>
      </div>
    </span>
    <span
      v-if="!inlinePrompt && (activeIcon || activeText)"
      :class="[
        ns.e('label'),
        ns.em('label', 'right'),
        ns.is('active', checked)
      ]"
    >
      <i v-if="activeIcon" :class="activeIcon"></i>
      <span v-if="!activeIcon && activeText" :aria-hidden="!checked">{{
        activeText
      }}</span>
    </span>
  </div>
</template>

<script lang="ts" setup name="EfSwitch">
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import type { CSSProperties } from 'vue';
import {
  useNamespace,
  useSize,
  useDisabled,
  useFormItemInputId,
  useFormItem
} from '../../hooks';
import { switchProps, switchEmits } from './switch';
import {
  UPDATE_MODEL_EVENT,
  CHANGE_EVENT,
  INPUT_EVENT,
  debugWarn,
  isBoolean,
  isPromise,
  addUnit
} from '../../utils';

const { formItem } = useFormItem();

const ns = useNamespace('switch');
const props = defineProps(switchProps);
const emit = defineEmits(switchEmits);

const switchSize = useSize();
const switchDisabled = useDisabled(computed(() => props.loading));
// isControlled 用于判断，用户传的是 modelValue 还是 value
const isControlled = ref(props.modelValue !== false);

const { inputId } = useFormItemInputId(props, {
  formItemContext: formItem
});

const input = ref<HTMLInputElement>();
const core = ref<HTMLSpanElement>();

watch(
  () => props.modelValue,
  () => {
    isControlled.value = true;
  }
);
watch(
  () => props.value,
  () => {
    isControlled.value = false;
  }
);

const actualValue = computed(() => {
  return isControlled.value ? props.modelValue : props.value;
});
// 是否选中
const checked = computed(() => actualValue.value === props.activeValue);

// 如果传进去的值不是 activeValue 和 inactiveValue 则进行重新赋值
if (![props.activeValue, props.inactiveValue].includes(actualValue.value)) {
  emit(UPDATE_MODEL_EVENT, props.inactiveValue);
  emit(CHANGE_EVENT, props.inactiveValue);
  emit(INPUT_EVENT, props.inactiveValue);
}

watch(checked, (newVal) => {
  input.value!.checked = newVal;
  if (props.validateEvent) {
    formItem?.validate('change').catch((err) => debugWarn(err));
  }
});

const handleChange = () => {
  const val = checked.value ? props.inactiveValue : props.activeValue;
  emit(UPDATE_MODEL_EVENT, val);
  emit(CHANGE_EVENT, val);
  emit(INPUT_EVENT, val);
  nextTick(() => {
    input.value!.checked = checked.value;
  });
};

const switchValue = () => {
  if (switchDisabled.value) return;

  const { beforeChange } = props;
  if (!beforeChange) {
    handleChange();
    return;
  }
  const shouldChange = beforeChange();

  if (![isBoolean(shouldChange), isPromise(shouldChange)].includes(true)) {
    console.error(
      new Error('beforeChange must return type `Promise<boolean>` or `boolean`')
    );
    return;
  }

  if (isPromise(shouldChange)) {
    shouldChange['then']((result) => {
      if (result) {
        handleChange();
      }
    }).catch((e) => {
      debugWarn('ef-switch', `some error occurred: ${e}`);
    });
  } else if (shouldChange) {
    handleChange();
  }
};

const styles = computed(() => {
  // 设置成变量形式 --ef-switch-on-color: props.activeColor
  return ns.cssVarBlock({
    ...(props.activeColor ? { 'on-color': props.activeColor } : null),
    ...(props.inactiveColor ? { 'off-color': props.inactiveColor } : null)
  });
});
const coreStyle = computed<CSSProperties>(() => ({
  width: addUnit(props.width)
}));

const focus = () => input.value?.focus?.();

onMounted(() => {
  input.value!.checked = checked.value;
});

defineExpose({
  /**
   *  @description manual focus to the switch component
   **/
  focus,
  /**
   * @description whether Switch is checked
   */
  checked
});
</script>
