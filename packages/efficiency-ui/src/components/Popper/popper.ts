import type { ExtractPropTypes } from 'vue';
import '@/style/popper.scss';

const effects = ['light', 'dark'] as const;
const triggers = ['click', 'contextmenu', 'hover', 'focus'] as const;

export const Effect = {
  LIGHT: 'light',
  DARK: 'dark'
} as const;

export const roleTypes = [
  'dialog',
  'grid',
  'listbox',
  'menu',
  'tooltip',
  'tree'
] as const;

export type PopperEffect = typeof effects[number];
export type PopperTrigger = typeof triggers[number];

export const usePopperProps = {
  role: {
    type: String,
    values: roleTypes,
    default: 'tooltip'
  }
} as const;

export type UsePopperProps = ExtractPropTypes<typeof usePopperProps>;
