import { defineComponent, PropType } from 'vue';
import 'uno.css';

type ISize = 'small' | 'medium' | 'large';
type IColor =
  | 'black'
  | 'gray'
  | 'red'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink';
const props = {
  color: {
    type: String as PropType<IColor>,
    default: 'blue'
  },
  size: {
    type: String as PropType<ISize>,
    default: 'medium'
  },
  plain: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  }
};
export default defineComponent({
  name: 'SButton',
  props,
  setup(props, { slots }) {
    const size = {
      small: { x: '2', y: '1', text: 'xs' },
      medium: { x: '3', y: '1.5', text: 'sm' },
      large: { x: '4', y: '2', text: 'base' }
    };
    return () => (
      <button
        class={`
        py-${size[props.size].y}
        px-${size[props.size].x}
        ${props.round ? 'rounded-full' : 'rounded'}
        bg-${props.color}-${props.plain ? '100' : '500'}
        hover:bg-${props.color}-400
        border-${props.color}-${props.plain ? '500' : '500'}
        cursor-pointer
        border-1
        text-${props.plain ? props.color + '-500' : 'white'}
        text-${size[props.size].text}
        hover:text-white
        transition duration-300 ease-in-out transform hover:scale-105
      `}
      >
        {props.icon !== '' ? (
          <i class={`i-ic-baseline-${props.icon} p-2`}></i>
        ) : (
          ''
        )}
        {slots.default ? slots.default() : ''}
      </button>
    );
  }
});
