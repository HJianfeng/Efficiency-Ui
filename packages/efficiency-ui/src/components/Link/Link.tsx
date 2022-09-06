import { defineComponent, PropType } from 'vue';
import '@/style/index.scss';
import '@/style/link.scss';
import 'uno.css';

type IType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default';
const props = {
  type: {
    type: String as PropType<IType>,
    default: 'default'
  },
  href: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  underline: {
    type: Boolean,
    default: false
  },
  target: {
    type: String,
    default: '_blank'
  }
};
export default defineComponent({
  name: 'EfLink',
  props,
  setup(props, { slots }) {
    const linkClass = [
      'ef-link',
      props.disabled ? `ef-disabled opacity-60` : '',
      !props.disabled ? 'cursor-pointer' : 'cursor-not-allowed',
      `ef-link--type-${props.type}`,
      'text-14px',
      props.underline ? 'ef-link__underline' : ''
    ];
    function handleClick(event: MouseEvent) {
      if (props.disabled) event.preventDefault();
    }
    return () => (
      <a
        class={linkClass}
        href={props.href}
        target={props.target}
        onClick={handleClick}
      >
        {slots.default ? slots.default() : ''}
      </a>
    );
  }
});
