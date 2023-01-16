<template>
  <span
    v-if="disableTransitions"
    :style="{ backgroundColor: color }"
    :class="classes"
    @click="handleClick"
  >
    <span :class="ns.e('content')">
      <slot />
    </span>
    <i
      v-if="closable"
      :class="['i-ion-ios-close-circle-outline', ns.e('close')]"
      @click.stop="handleClose"
    />
  </span>
  <transition v-else :name="`${ns.namespace.value}-zoom-in-center`" appear>
    <span
      :class="classes"
      :style="{ backgroundColor: color }"
      @click="handleClick"
    >
      <span :class="ns.e('content')">
        <slot />
      </span>
      <i
        v-if="closable"
        :class="['i-ion-ios-close-circle-outline', 'ef-icon', ns.e('close')]"
        @click.stop="handleClose"
      />
    </span>
  </transition>
</template>

<script lang="ts" setup name="EfTag">
import { computed } from 'vue';
import { tagEmits, tagProps } from './tag';
import { useNamespace, useSize } from '../../hooks';

const props = defineProps(tagProps);
const emit = defineEmits(tagEmits);
const tagSize = useSize();
const ns = useNamespace('tag');

const classes = computed(() => {
  const { type, hit, effect, closable, round } = props;
  return [
    ns.b(),
    ns.is('closable', closable),
    ns.m(type),
    ns.m(tagSize.value),
    ns.m(effect),
    ns.is('hit', hit),
    ns.is('round', round)
  ];
});

const handleClose = (event: MouseEvent) => {
  emit('close', event);
};
const handleClick = (event: MouseEvent) => {
  emit('click', event);
};
</script>
