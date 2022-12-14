import { defineComponent, PropType } from 'vue';
import '@/style/index.scss';
import '@/style/button.scss';
import 'uno.css';

export type ISize = 'small' | 'medium' | 'large';
export type IType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'text';
export const props = {
  size: {
    type: String as PropType<ISize>,
    default: 'medium'
  },
  type: {
    type: String as PropType<IType>,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  round: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
};
export default defineComponent({
  name: 'EfButton',
  props,
  setup(props, { slots }) {
    const size = {
      small: { x: '2', h: '24px', text: '12px', name: 'small' },
      medium: { x: '3', h: '32px', text: '14px', name: 'medium' },
      large: { x: '4', h: '40px', text: '16px', name: 'large' }
    };
    const sizeItem = size[props.size] || size.medium;
    const isDisabled = props.disabled || props.loading;
    const bType = [
      'primary',
      'danger',
      'warning',
      'success',
      'info',
      'text'
    ].includes(props.type)
      ? props.type || 'info'
      : 'info';
    const buttonClass = [
      `ef-button`,
      `flex-inline`,
      `items-center`,
      `ef-button--type-${bType}`,
      `h-${sizeItem.h}`,
      `px-${sizeItem.x}`,
      `ef-button-size--${sizeItem.name}`,
      `text-${sizeItem.text}`,
      `${props.round ? 'rounded-full' : 'rounded'}`,
      !isDisabled ? 'cursor-pointer' : 'cursor-not-allowed',
      isDisabled ? `ef-disabled opacity-60` : '',
      `border-1`
    ];
    return () => (
      <button
        class={buttonClass}
        type="button"
        disabled={isDisabled}
        onClick={props.onClick}
      >
        <div class="ef-button-inner">
          {props.loading ? (
            <i class={`i-line-md-loading-loop p-2 mr-1`}></i>
          ) : (
            ''
          )}
          {props.icon !== '' ? (
            <i class={`${props.icon} ${slots.default ? 'mr-1' : ''}`}></i>
          ) : (
            ''
          )}
          {slots.default ? slots.default() : ''}
        </div>
      </button>
    );
  }
});
