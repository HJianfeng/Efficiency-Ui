import { presetUno, presetAttributify, presetIcons } from 'unocss';
import Unocss from 'unocss/vite';
import IconList from './icon';

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
  ...IconList
];
export default () =>
  Unocss({
    safelist,
    presets: [
      presetUno(),
      presetAttributify(),
      presetIcons({
        extraProperties: { display: 'inline-block' },
        unit: 'px',
        scale: 16
      })
    ]
  });
