<template>
  <component :is="tag" :class="classes" :style="style">
    <slot />
  </component>
</template>

<script setup lang="ts" name="EfCol">
import { computed, inject } from 'vue';
import { isNumber, isObject } from '../../utils';
import { colProps } from './col';
import type { CSSProperties } from 'vue';

const props = defineProps(colProps);

const { gutter } = inject('gutter', { gutter: computed(() => 0) });

const style = computed(() => {
  const styles: CSSProperties = {};
  if (gutter.value) {
    styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`;
  }
  return styles;
});

const classes = computed(() => {
  const classes: string[] = ['ef-col'];
  const pos = ['span', 'offset', 'pull', 'push'] as const;

  pos.forEach((prop) => {
    const size = props[prop];
    if (isNumber(size)) {
      if (prop === 'span') classes.push(`ef-col-${props[prop]}`);
      else if (size > 0) classes.push(`ef-col-${prop}-${props[prop]}`);
    }
  });

  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
  sizes.forEach((size) => {
    if (isNumber(props[size])) {
      classes.push(`ef-col-${size}-${props[size]}`);
    } else if (isObject(props[size])) {
      Object.entries(props[size]).forEach(([prop, sizeProp]) => {
        classes.push(
          prop !== 'span'
            ? `ef-col-${size}-${prop}-${sizeProp}`
            : `ef-col-${size}-${sizeProp}`
        );
      });
    }
  });

  // this is for the fix
  if (gutter.value) {
    classes.push('is-guttered');
  }
  return classes;
});
</script>
