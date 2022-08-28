<template>
  <component :is="tag" :style="style" :class="className"><slot /></component>
</template>

<script setup lang="ts" name="EfRow">
import { computed, provide } from 'vue';
import { rowProps } from './row';
import '@/style/row.scss';
import type { CSSProperties } from 'vue';

const props = defineProps(rowProps);
const gutter = computed(() => props.gutter);
provide('gutter', {
  gutter
});
const className = computed(() => {
  return [
    'ef-row',
    'flex',
    'flex-wrap',
    props.align !== 'start' ? `items-${props.align}` : '',
    props.justify !== 'start' ? `justify-${props.justify}` : ''
  ];
});
const style = computed(() => {
  const styles: CSSProperties = {};
  if (!props.gutter) {
    return styles;
  }
  styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
  return styles;
});
</script>
