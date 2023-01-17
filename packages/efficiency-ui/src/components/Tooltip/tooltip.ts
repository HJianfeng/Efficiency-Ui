import { definePropType } from '../../utils';
import { usePopperContentProps, usePopperTriggerProps } from '../Popper';
import {
  POPPER_CONTAINER_SELECTOR,
  useDelayedToggleProps,
  useNamespace,
  EVENT_CODE
} from '../../hooks';
import type Tooltip from './tooltip.vue';

import type { ExtractPropTypes } from 'vue';

const triggers = ['hover', 'focus', 'click', 'contextmenu'] as const;
const ns = useNamespace('tooltip');

export type Trigger = typeof triggers[number];

export const useTooltipContentProps = {
  ...useDelayedToggleProps,
  ...usePopperContentProps,
  appendTo: {
    type: definePropType<string | HTMLElement>([String, Object]),
    default: POPPER_CONTAINER_SELECTOR
  },
  content: {
    type: String,
    default: ''
  },
  rawContent: {
    type: Boolean,
    default: false
  },
  persistent: Boolean,
  ariaLabel: String,
  // because model toggle prop is generated dynamically
  // so the typing cannot be evaluated by typescript as type:
  // [name]: { type: Boolean, default: null }
  // so we need to declare that again for type checking.
  visible: {
    type: definePropType<boolean | null>(Boolean),
    default: null
  },
  transition: {
    type: String,
    default: `${ns.namespace.value}-fade-in-linear`
  },
  teleported: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean
  },
  arrowOffset: {
    type: Number,
    default: 5
  }
} as const;

export const useTooltipTriggerProps = {
  ...usePopperTriggerProps,
  disabled: Boolean,
  trigger: {
    type: definePropType<Trigger | Trigger[]>([String, Array]),
    default: 'hover'
  },
  triggerKeys: {
    type: definePropType<string[]>(Array),
    default: () => [EVENT_CODE.enter, EVENT_CODE.space]
  }
} as const;

export const useTooltipProps = {
  openDelay: {
    type: Number
  },
  visibleArrow: {
    type: Boolean,
    default: undefined
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  showArrow: {
    type: Boolean,
    default: true
  }
};

export type ElTooltipContentProps = ExtractPropTypes<
  typeof useTooltipContentProps
>;

export type ElTooltipTriggerProps = ExtractPropTypes<
  typeof useTooltipTriggerProps
>;

export type ElTooltipProps = ExtractPropTypes<typeof useTooltipProps> &
  ElTooltipContentProps &
  ElTooltipTriggerProps;

export type TooltipInstance = InstanceType<typeof Tooltip>;
