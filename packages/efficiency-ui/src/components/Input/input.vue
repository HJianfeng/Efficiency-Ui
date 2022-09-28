<template>
  <div
    class="ef-input"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :class="{
      'ef-input-group--prepend': $slots.prepend,
      'ef-input-group--append': $slots.append
    }"
  >
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="ef-input-prepend">
        <slot name="prepend" />
      </div>
      <div class="ef-input__wrapper" :class="{ 'ef-input__focus': focused }">
        <input
          ref="input"
          class="ef-input__inner"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          v-bind="attrs"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :style="inputStyle"
          :tabindex="tabindex"
          :aria-label="label"
          :formatter="formatter"
          :parser="parser"
          @compositionstart="handleCompositionStart"
          @compositionupdate="handleCompositionUpdate"
          @compositionend="handleCompositionEnd"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          @keydown="handleKeydown"
        />
        <span class="ef-input__suffix">
          <span class="ef-input__suffix-inner">
            <i
              v-if="showPwdVisible"
              @click="handlePasswordVisible"
              :class="passwordIcon"
              class="ml-8px cursor-pointere ef-input__password ef-input__icon"
            />
            <i
              v-if="showClear"
              @click="clear"
              class="ml-8px cursor-pointer ef-input__clear ef-input__icon i-ion-ios-close-circle-outline"
            />
            <span v-if="isWordLimitVisible" class="ef-input-count">
              <span class="ef-input-count__inner"
                >{{ textLength }} / {{ attrs.maxlength }}</span
              >
            </span>
          </span>
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="ef-input-append">
        <slot name="append" />
      </div>
    </template>

    <template v-else>
      <textarea
        ref="textarea"
        class="ef-textarea__inner"
        :class="{ 'ef-input__focus': focused }"
        v-bind="attrs"
        :style="textareaStyle"
        :tabindex="tabindex"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :aria-label="label"
        :placeholder="placeholder"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
      />
      <span
        v-if="isWordLimitVisible"
        :style="countStyle"
        class="ef-textarea__count"
      >
        {{ textLength }} / {{ attrs.maxlength }}
      </span>
    </template>
  </div>
</template>
<script lang="ts" setup name="EfInput">
import {
  computed,
  ref,
  shallowRef,
  nextTick,
  StyleValue,
  watch,
  onMounted,
  toRef,
  getCurrentInstance
} from 'vue';
import { inputEmits, inputProps } from './input';
import { UPDATE_MODEL_EVENT } from '../../utils/const/event';
import { isObject, isNil } from '../../utils';
import { calcTextareaHeight } from './utils';

type TargetElement = HTMLInputElement | HTMLTextAreaElement;
const props = defineProps(inputProps);
const input = shallowRef<HTMLInputElement>();
const textarea = shallowRef<HTMLTextAreaElement>();
const _ref = computed(() => input.value || textarea.value);
const emit = defineEmits(inputEmits);
const isComposing = ref(false);

const focused = ref(false);
const hovering = ref(false);
const countStyle = ref<StyleValue>();
const textareaCalcStyle = shallowRef(props.inputStyle);
const nativeInputValue = computed(() =>
  isNil(props.modelValue) ? '' : String(props.modelValue)
);

const instance = getCurrentInstance()!;
const attrs = computed(() => {
  const arr = Object.entries(instance.proxy?.$attrs!).filter(
    ([key]) => !['class', 'style'].includes(key) && !/^on[A-Z]/.test(key)
  );
  const ans = {};
  arr.forEach((i) => {
    ans[i[0]] = i[1];
  });
  return ans;
});

// 密码输入框
const passwordVisible = ref(false);
const passwordIcon = computed(() =>
  passwordVisible.value ? 'i-ph-eye-light' : 'i-ph-eye-slash-light'
);
const handlePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
  focus();
};
// 自定义样式
const textareaStyle = computed<StyleValue>(() => [
  props.inputStyle,
  textareaCalcStyle.value,
  `resize: ${props.resize}`
]);

// 聚焦
const focus = async () => {
  await nextTick();
  _ref.value?.focus();
};
const select = () => {
  _ref.value?.select();
};
const clear = () => {
  emit(UPDATE_MODEL_EVENT, '');
  emit('change', '');
  emit('clear');
  emit('input', '');
};
const resizeTextarea = () => {
  const { type, autosize } = props;

  if (type !== 'textarea') return;

  if (autosize) {
    const minRows = isObject(autosize) ? autosize['minRows'] : undefined;
    const maxRows = isObject(autosize) ? autosize['maxRows'] : undefined;
    textareaCalcStyle.value = {
      ...calcTextareaHeight(textarea.value!, minRows, maxRows)
    };
  } else {
    textareaCalcStyle.value = {
      minHeight: calcTextareaHeight(textarea.value!).minHeight
    };
  }
};

const setNativeInputValue = () => {
  const input = _ref.value;
  if (!input || input.value === nativeInputValue.value) return;
  input.value = nativeInputValue.value;
};
/**
 * 事件触发
 */
const handleInput = async (event: Event) => {
  let { value } = event.target as TargetElement;

  if (props.formatter) {
    value = props.parser ? props.parser(value) : value;
    value = props.formatter(value);
  }

  // should not emit input during composition
  if (isComposing.value) return;

  emit(UPDATE_MODEL_EVENT, value);
  emit('input', value);

  // ensure native input value is controlled
  await nextTick();
  setNativeInputValue();
};
const handleChange = (event: Event) => {
  emit('change', (event.target as TargetElement).value);
};
const handleCompositionStart = (event: CompositionEvent) => {
  emit('compositionstart', event);
  isComposing.value = true;
};

const handleCompositionUpdate = (event: CompositionEvent) => {
  emit('compositionupdate', event);
  isComposing.value = false;
};

const handleCompositionEnd = (event: CompositionEvent) => {
  emit('compositionend', event);
  if (isComposing.value) {
    isComposing.value = false;
    handleInput(event);
  }
};
const handleFocus = (event: FocusEvent) => {
  focused.value = true;
  emit('focus', event);
};

const handleBlur = (event: FocusEvent) => {
  focused.value = false;
  emit('blur', event);
};
const handleKeydown = (evt: KeyboardEvent) => {
  emit('keydown', evt);
};
const handleMouseLeave = (evt: MouseEvent) => {
  hovering.value = false;
  emit('mouseleave', evt);
};

const handleMouseEnter = (evt: MouseEvent) => {
  hovering.value = true;
  emit('mouseenter', evt);
};

// 属性
const showClear = computed(
  () =>
    props.clearable &&
    !props.disabled &&
    !props.readonly &&
    !!nativeInputValue.value &&
    (focused.value || hovering.value)
);
const showPwdVisible = computed(
  () =>
    props.showPassword &&
    !props.disabled &&
    !props.readonly &&
    !!nativeInputValue.value &&
    (!!nativeInputValue.value || focused.value)
);
const isWordLimitVisible = computed(
  () =>
    props.showWordLimit &&
    !!attrs.value['maxlength'] &&
    (props.type === 'text' || props.type === 'textarea') &&
    !props.disabled &&
    !props.readonly &&
    !props.showPassword
);
const textLength = computed(() => Array.from(nativeInputValue.value).length);
// watch
watch(nativeInputValue, () => setNativeInputValue());
// 在 <input> 和 <textarea> 之间切换时
// 更新 DOM dependent value and styles
watch(
  () => props.type,
  async () => {
    await nextTick();
    setNativeInputValue();
    resizeTextarea();
  }
);
watch(
  () => props.modelValue,
  () => {
    nextTick(() => resizeTextarea()); // 更新 textarea 高度
  }
);
onMounted(async () => {
  setNativeInputValue();
  await nextTick();
  resizeTextarea();
});
defineExpose({
  /** @description HTML input element */
  input,
  /** @description HTML textarea element */
  textarea,
  /** @description style of textarea. */
  textareaStyle,
  /** @description from props (used on unit test) */
  autosize: toRef(props, 'autosize'),
  /** @description HTML element, input or textarea */
  ref: _ref,
  /** @description HTML input element native method */
  focus,
  /** @description HTML input element native method */
  blur,
  /** @description HTML input element native method */
  select,
  /** @description clear input value */
  clear,
  /** @description resize textarea. */
  resizeTextarea
});
</script>
