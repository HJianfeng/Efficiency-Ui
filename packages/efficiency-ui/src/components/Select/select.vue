<template>
  <div
    ref="selectWrapper"
    :class="wrapperKls"
    v-click-outside:[popperPaneRef]="handleClose"
    @click.stop="toggleMenu"
  >
    <Tooltip
      ref="tooltipRef"
      placement="bottom-start"
      :visible="dropMenuVisible"
      :teleported="teleported"
      :popper-class="[nsSelect.e('popper'), popperClass]"
      :fallback-placements="['bottom-start', 'top-start', 'right', 'left']"
      :effect="effect"
      pure
      trigger="click"
      :transition="`${nsSelect.namespace.value}-zoom-in-top`"
      :stop-popper-mouse-event="false"
      :gpu-acceleration="false"
      :persistent="persistent"
      @show="handleMenuEnter"
    >
      <template #default>
        <div class="select-trigger">
          <div
            v-if="multiple"
            ref="tags"
            :class="nsSelect.e('tags')"
            :style="selectTagsStyle"
          >
            <span
              v-if="collapseTags && selected.length"
              :class="[
                nsSelect.b('tags-wrapper'),
                { 'has-prefix': prefixWidth && selected.length }
              ]"
            >
              <Tag
                :closable="!selectDisabled && !selected[0].isDisabled"
                :size="collapseTagSize"
                :hit="selected[0].hitState"
                disable-transitions
                @close="deleteTag($event, selected[0])"
              >
                <span
                  :class="nsSelect.e('tags-text')"
                  :style="{ maxWidth: inputWidth - 123 + 'px' }"
                  >{{ selected[0].currentLabel }}</span
                >
              </Tag>
              <Tag
                v-if="selected.length > 1"
                :closable="false"
                :size="collapseTagSize"
                disable-transitions
              >
                <Tooltip
                  v-if="collapseTagsTooltip"
                  :disabled="dropMenuVisible"
                  :fallback-placements="['bottom', 'top', 'right', 'left']"
                  :effect="effect"
                  placement="bottom"
                  :teleported="teleported"
                >
                  <template #default>
                    <span :class="nsSelect.e('tags-text')"
                      >+ {{ selected.length - 1 }}</span
                    >
                  </template>
                  <template #content>
                    <div :class="nsSelect.e('collapse-tags')">
                      <div
                        v-for="(item, idx) in selected.slice(1)"
                        :key="idx"
                        :class="nsSelect.e('collapse-tag')"
                      >
                        <Tag
                          :key="getValueKey(item)"
                          class="in-tooltip"
                          :closable="!selectDisabled && !item.isDisabled"
                          :size="collapseTagSize"
                          :hit="item.hitState"
                          disable-transitions
                          :style="{ margin: '2px' }"
                          @close="deleteTag($event, item)"
                        >
                          <span
                            :class="nsSelect.e('tags-text')"
                            :style="{
                              maxWidth: inputWidth - 75 + 'px'
                            }"
                            >{{ item.currentLabel }}</span
                          >
                        </Tag>
                      </div>
                    </div>
                  </template>
                </Tooltip>
                <span v-else :class="nsSelect.e('tags-text')"
                  >+ {{ selected.length - 1 }}</span
                >
              </Tag>
            </span>
            <transition v-if="!collapseTags" @after-leave="resetInputHeight">
              <span
                :class="[
                  nsSelect.b('tags-wrapper'),
                  { 'has-prefix': prefixWidth && selected.length }
                ]"
              >
                <Tag
                  v-for="item in selected"
                  :key="getValueKey(item)"
                  :closable="!selectDisabled && !item.isDisabled"
                  :size="collapseTagSize"
                  :hit="item.hitState"
                  disable-transitions
                  :style="{ margin: '2px' }"
                  @close="deleteTag($event, item)"
                >
                  <span
                    :class="nsSelect.e('tags-text')"
                    :style="{ maxWidth: inputWidth - 75 + 'px' }"
                    >{{ item.currentLabel }}</span
                  >
                </Tag>
              </span>
            </transition>
            <input
              v-if="filterable"
              ref="input"
              v-model="query"
              type="text"
              :class="[nsSelect.e('input'), nsSelect.is(selectSize)]"
              :disabled="selectDisabled"
              :autocomplete="autocomplete"
              :style="{
                marginLeft:
                  (prefixWidth && !selected.length) || tagInMultiLine
                    ? `${prefixWidth}px`
                    : '',
                flexGrow: 1,
                width: `${inputLength / (inputWidth - 32)}%`,
                maxWidth: `${inputWidth - 42}px`
              }"
              @focus="handleFocus"
              @blur="handleBlur"
              @keyup="managePlaceholder"
              @keydown="resetInputState"
              @keydown.down.prevent="navigateOptions('next')"
              @keydown.up.prevent="navigateOptions('prev')"
              @keydown.esc="handleKeydownEscape"
              @keydown.enter.stop.prevent="selectOption"
              @keydown.delete="deletePrevTag"
              @keydown.tab="visible = false"
              @compositionstart="handleComposition"
              @compositionupdate="handleComposition"
              @compositionend="handleComposition"
              @input="debouncedQueryChange"
            />
          </div>
          <EfInput
            :id="id"
            ref="reference"
            :placeholder="currentPlaceholder"
            v-model="selectedLabel"
            type="text"
            :name="name"
            :autocomplete="autocomplete"
            :size="selectSize"
            :disabled="selectDisabled"
            :readonly="readonly"
            :validate-event="false"
            :class="[nsSelect.is('focus', visible)]"
            :tabindex="multiple && filterable ? -1 : undefined"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="debouncedOnInputChange"
            @paste="debouncedOnInputChange"
            @compositionstart="handleComposition"
            @compositionupdate="handleComposition"
            @compositionend="handleComposition"
            @keydown.down.stop.prevent="navigateOptions('next')"
            @keydown.up.stop.prevent="navigateOptions('prev')"
            @keydown.enter.stop.prevent="selectOption"
            @keydown.esc="handleKeydownEscape"
            @keydown.tab="visible = false"
            @mouseenter="inputHovering = true"
            @mouseleave="inputHovering = false"
          >
            <template v-if="$slots.prefix" #prefix>
              <div
                style="
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <slot name="prefix" />
              </div>
            </template>
            <template #suffix>
              <i
                v-if="iconComponent && !showClose"
                :class="[
                  iconComponent,
                  nsSelect.e('caret'),
                  nsSelect.e('icon'),
                  iconReverse
                ]"
              />
              <i
                v-if="showClose"
                :class="[
                  'i-ion-ios-close-circle-outline',
                  nsSelect.e('caret'),
                  nsSelect.e('icon')
                ]"
                @click="handleClearClick"
              />
            </template>
          </EfInput>
        </div>
      </template>
      <template #content>
        <EfSelectMenu>
          <Scrollbar
            v-show="options.size > 0 && !loading"
            ref="scrollbar"
            tag="ul"
            :wrap-class="nsSelect.be('dropdown', 'wrap')"
            :view-class="nsSelect.be('dropdown', 'list')"
            :class="[
              nsSelect.is(
                'empty',
                !allowCreate && Boolean(query) && filteredOptionsCount === 0
              )
            ]"
          >
            <ef-option v-if="showNewOption" :value="query" :created="true" />
            <slot />
          </Scrollbar>
          <template
            v-if="
              emptyText &&
              (!allowCreate || loading || (allowCreate && options.size === 0))
            "
          >
            <slot v-if="$slots.empty" name="empty" />
            <p v-else :class="nsSelect.be('dropdown', 'empty')">
              {{ emptyText }}
            </p>
          </template>
        </EfSelectMenu>
      </template>
    </Tooltip>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  unref,
  toRefs,
  provide,
  reactive,
  onMounted,
  nextTick
} from 'vue';
import { ClickOutside } from '../../directives';
import { Tooltip, useTooltipContentProps } from '../Tooltip';
import { Input as EfInput } from '../Input';

import EfSelectMenu from './select-dropdown.vue';
import { Scrollbar } from '../Scrollbar';
import { Tag } from '../Tag';
import EfOption from './option.vue';
import { useResizeObserver } from '@vueuse/core';

import { useNamespace } from '../../hooks';
import { useSelect, useSelectStates } from './useSelect';
import type { ComponentSize } from '../../utils';
import type { PropType } from 'vue';
import type { SelectContext } from './token';
import { selectKey } from './token';

const COMPONENT_NAME = 'EfSelect';
export default defineComponent({
  name: COMPONENT_NAME,
  componentName: COMPONENT_NAME,
  components: { Tooltip, Scrollbar, EfInput, EfSelectMenu, EfOption, Tag },
  directives: { ClickOutside },
  props: {
    name: String,
    id: String,
    modelValue: {
      type: [Array, String, Number, Blob, Object],
      default: undefined
    },
    size: {
      type: String as PropType<ComponentSize>
    },
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    loading: Boolean,
    loadingText: String,
    automaticDropdown: Boolean,
    remote: Boolean,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    effect: {
      type: String as PropType<'light' | 'dark' | string>,
      default: 'light'
    },
    popperClass: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    teleported: useTooltipContentProps.teleported,
    persistent: {
      type: Boolean,
      default: true
    },
    fitInputWidth: {
      // 下拉框的宽度是否与输入框相同
      type: Boolean,
      default: false
    },
    suffixIcon: {
      type: String,
      default: 'i-ic-outline-keyboard-arrow-down'
    },

    // allowCreate: Boolean,
    noMatchText: String,
    noDataText: String,
    defaultFirstOption: Boolean,
    reserveKeyword: {
      type: Boolean,
      default: true
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    collapseTags: Boolean,
    collapseTagsTooltip: {
      type: Boolean,
      default: false
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  setup(props, ctx) {
    const nsSelect = useNamespace('select');
    const nsInput = useNamespace('input');

    const states = useSelectStates(props);
    const {
      optionsArray,
      selectSize,
      readonly,
      handleResize,
      collapseTagSize,
      debouncedOnInputChange,
      debouncedQueryChange,
      deletePrevTag,
      deleteTag,
      deleteSelected,
      scrollToOption,
      handleOptionSelect,
      setSelected,
      resetInputHeight,
      managePlaceholder,
      showClose,
      selectDisabled,
      iconComponent,
      iconReverse,
      showNewOption,
      emptyText,
      toggleLastOptionHitState,
      resetInputState,
      handleComposition,
      onOptionCreate,
      onOptionDestroy,
      handleMenuEnter,
      handleFocus,
      blur,
      handleBlur,
      handleClearClick,
      handleClose,
      handleKeydownEscape,
      toggleMenu,
      selectOption,
      getValueKey,
      navigateOptions,
      dropMenuVisible,

      reference,
      input,
      tooltipRef,
      tags,
      selectWrapper,
      scrollbar,
      queryChange,
      groupQueryChange
    } = useSelect(props, states, ctx);

    const {
      inputWidth,
      selected,
      inputLength,
      filteredOptionsCount,
      visible,
      selectedLabel,
      hoverIndex,
      query,
      inputHovering,
      currentPlaceholder,
      softFocus,
      menuVisibleOnFocus,
      isOnComposition,
      isSilentBlur,
      options,
      cachedOptions,
      optionsCount,
      prefixWidth,
      tagInMultiLine
    } = toRefs(states);

    const wrapperKls = computed(() => {
      const classList = [nsSelect.b()];
      const _selectSize = unref(selectSize);
      if (_selectSize) {
        classList.push(nsSelect.m(_selectSize));
      }
      if (props.disabled) {
        classList.push(nsSelect.m('disabled'));
      }
      return classList;
    });
    const selectTagsStyle = computed(() => {
      return {
        maxWidth: `${unref(inputWidth) - 32}px`,
        width: '100%'
      };
    });
    provide(
      selectKey,
      reactive({
        props,
        options,
        optionsArray,
        cachedOptions,
        optionsCount,
        filteredOptionsCount,
        hoverIndex,
        handleOptionSelect,
        onOptionCreate,
        onOptionDestroy,
        selectWrapper,
        selected,
        setSelected,
        queryChange,
        groupQueryChange
      }) as unknown as SelectContext
    );
    onMounted(() => {
      states.cachedPlaceHolder = currentPlaceholder.value =
        props.placeholder || '请选择';
      if (
        props.multiple &&
        Array.isArray(props.modelValue) &&
        props.modelValue.length > 0
      ) {
        currentPlaceholder.value = '';
      }
      useResizeObserver(selectWrapper, handleResize);
      if (props.remote && props.multiple) {
        resetInputHeight();
      }
      nextTick(() => {
        const refEl = reference.value && reference.value.$el;
        if (!refEl) return;
        inputWidth.value = refEl.getBoundingClientRect().width;
        if (ctx.slots.prefix) {
          const prefix = refEl.querySelector(`.${nsInput.e('prefix')}`);
          prefixWidth.value = Math.max(
            prefix.getBoundingClientRect().width + 5,
            30
          );
        }
      });
      setSelected();
    });
    const popperPaneRef = computed(
      () => tooltipRef.value?.popperRef?.contentRef
    );
    return {
      tagInMultiLine,
      prefixWidth,
      selectSize,
      readonly,
      handleResize,
      collapseTagSize,
      debouncedOnInputChange,
      debouncedQueryChange,
      deletePrevTag,
      deleteTag,
      deleteSelected,
      handleOptionSelect,
      scrollToOption,
      inputWidth,
      selected,
      inputLength,
      filteredOptionsCount,
      visible,
      softFocus,
      selectedLabel,
      hoverIndex,
      query,
      inputHovering,
      currentPlaceholder,
      menuVisibleOnFocus,
      isOnComposition,
      isSilentBlur,
      options,
      resetInputHeight,
      managePlaceholder,
      showClose,
      selectDisabled,
      iconComponent,
      iconReverse,
      showNewOption,
      emptyText,
      toggleLastOptionHitState,
      resetInputState,
      handleComposition,
      handleMenuEnter,
      handleFocus,
      blur,
      handleBlur,
      handleClearClick,
      handleClose,
      handleKeydownEscape,
      toggleMenu,
      selectOption,
      getValueKey,
      navigateOptions,
      dropMenuVisible,
      focus,

      reference,
      input,
      tooltipRef,
      popperPaneRef,
      tags,
      selectWrapper,
      scrollbar,

      wrapperKls,
      selectTagsStyle,
      nsSelect
    };
  }
});
</script>
