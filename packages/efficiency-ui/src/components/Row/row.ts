import type { ExtractPropTypes } from 'vue';
import type Row from './Row.vue';

export const RowJustify = [
  'start',
  'center',
  'end',
  'around',
  'between',
  'evenly'
] as const;

export const RowAlign = ['start', 'center', 'end'] as const;

export const rowProps = {
  tag: {
    type: String,
    default: 'div'
  },
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String,
    values: RowJustify,
    default: 'start'
  },
  align: {
    type: String,
    values: RowAlign,
    default: 'start'
  }
} as const;

export type RowProps = ExtractPropTypes<typeof rowProps>;
export type RowInstance = InstanceType<typeof Row>;
