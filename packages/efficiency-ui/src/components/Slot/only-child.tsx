import {
  Comment,
  Fragment,
  Text,
  cloneVNode,
  defineComponent,
  inject,
  withDirectives
} from 'vue';
import {
  FORWARD_REF_INJECTION_KEY,
  useForwardRefDirective,
  useNamespace
} from '../../hooks';
import { debugWarn, isObject } from '../../utils';
import type { Ref, VNode } from 'vue';

declare const NOOP: () => void;
const NAME = 'EfOnlyChild';
export const OnlyChild = defineComponent({
  name: NAME,
  setup(_, { slots, attrs }) {
    const forwardRefInjection = inject(FORWARD_REF_INJECTION_KEY);
    const forwardRefDirective = useForwardRefDirective(
      forwardRefInjection?.setForwardRef ?? NOOP
    );

    return () => {
      const defaultSlot = slots.default?.(attrs);
      if (!defaultSlot) return null;

      if (defaultSlot.length > 1) {
        debugWarn(NAME, 'requires exact only one valid child.');
        return null;
      }

      const firstLegitNode = findFirstLegitChild(defaultSlot);
      if (!firstLegitNode) {
        debugWarn(NAME, 'no valid child node found');
        return null;
      }
      // 给 firstLegitNode 增加自定义指令。
      return withDirectives(cloneVNode(firstLegitNode!, attrs), [
        [forwardRefDirective]
      ]);
    };
  }
});

/**
 * 找到第一个真正的子节点。
 */
function findFirstLegitChild(node: VNode[] | undefined): VNode | null {
  if (!node) return null;
  const children = node as VNode[];
  for (const child of children) {
    /**
     * 当用户使用 h(Fragment, [text]) 来渲染字符串,
     * 当value为原始值时，这个 switch 无法处理，直接返回 wrapTextContent
     */
    if (isObject(child)) {
      switch (child.type) {
        case Comment:
          continue;
        case Text:
        case 'svg':
          return wrapTextContent(child);
        case Fragment:
          return findFirstLegitChild(child.children as VNode[]);
        default:
          return child;
      }
    }
    return wrapTextContent(child);
  }
  return null;
}

function wrapTextContent(s: string | VNode) {
  const ns = useNamespace('only-child');
  return <span class={ns.e('content')}>{s}</span>;
}

export type OnlyChildExpose = {
  forwardRef: Ref<HTMLElement>;
};
