import type { Measurable } from '../../token';
import { definePropType } from '../../utils/index';
/**
  trigger 组件是用来定义 popper 的触发元素。比如：
  <ef-tooltip>
    <template #content>line </template>
    <button>test</button>
  <ef-tooltip>
  上面组件中的 <button>test</button>

  因为我们如果我们传入的触发元素有多个，比如
  <ef-tooltip>
    <button>test1</button>
    <button>test2</button>
  <ef-tooltip>
  那么就会导致歧义，所以这个组件通过 ef-only-child 限制只有传入的第一个节点是有效的，即 <button>test1</button>

 并添加无障碍访问
 */
export const usePopperTriggerProps = {
  virtualRef: {
    type: definePropType<Measurable>(Object)
  },
  virtualTriggering: Boolean,
  onMouseenter: Function,
  onMouseleave: Function,
  onClick: Function,
  onKeydown: Function,
  onFocus: Function,
  onBlur: Function,
  onContextmenu: Function,
  id: String,
  open: Boolean
} as const;

export type PopperTriggerProps = typeof usePopperTriggerProps;
