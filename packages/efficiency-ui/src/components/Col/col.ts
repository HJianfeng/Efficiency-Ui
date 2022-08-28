import type { ExtractPropTypes, PropType } from 'vue';
import type Col from './col.vue';

export type Mutable<T> = { -readonly [P in keyof T]: T[P] };
export const definePropType = <T>(val: any): PropType<T> => val;
export const mutable = <T extends readonly any[] | Record<string, unknown>>(
  val: T
) => val as Mutable<typeof val>;

export type ColSizeObject = {
  span?: number;
  offset?: number;
  pull?: number;
  push?: number;
};
export type ColSize = number | ColSizeObject;

export const colProps = {
  tag: {
    type: String,
    default: 'div'
  },
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  },
  pull: {
    type: Number,
    default: 0
  },
  push: {
    type: Number,
    default: 0
  },
  xs: {
    type: Number as PropType<ColSize>,
    default: ''
  },
  sm: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => mutable({} as const)
  },
  md: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => mutable({} as const)
  },
  lg: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => mutable({} as const)
  },
  xl: {
    type: definePropType<ColSize>([Number, Object]),
    default: () => mutable({} as const)
  }
} as const;
export type ColProps = ExtractPropTypes<typeof colProps>;
export type ColInstance = InstanceType<typeof Col>;
