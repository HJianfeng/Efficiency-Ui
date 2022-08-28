import { presetUno, presetAttributify, presetIcons } from 'unocss';
import Unocss from 'unocss/vite';

const icon = [
  ...[
    'search',
    'edit',
    'check',
    'message',
    'star-off',
    'delete',
    'add',
    'share'
  ].map((v) => `i-ic-baseline-${v}`)
];
const safelist = [
  ...['start', 'center', 'end', 'around', 'between', 'evenly'].map(
    (i) => `justify-${i}`
  ),
  'bg-purple',
  ...['start', 'center', 'end'].map((i) => `items-${i}`),
  ...Array.from({ length: 40 }, (_, i) => `h-${i + 20}px`),
  ...Array.from({ length: 8 }, (_, i) => `px-${i + 1}`),
  ...Array.from({ length: 8 }, (_, i) => `px-${i + 0.5}`),
  ...Array.from({ length: 9 }, (_, i) => `opacity-${i}0`),
  ...Array.from({ length: 20 }, (_, i) => `text-${i + 12}px`),
  ...['rounded-full', 'rounded'],
  ...icon
];
export default () =>
  Unocss({
    safelist,
    presets: [presetUno(), presetAttributify(), presetIcons()]
  });
