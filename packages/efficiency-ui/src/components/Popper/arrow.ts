import type { ExtractPropTypes } from 'vue';

export const usePopperArrowProps = {
  arrowOffset: {
    type: Number,
    default: 5
  }
} as const;

export type UsePopperArrowProps = ExtractPropTypes<typeof usePopperArrowProps>;
