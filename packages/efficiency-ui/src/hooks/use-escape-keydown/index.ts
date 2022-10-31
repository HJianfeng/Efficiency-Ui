/* eslint-disable no-unused-vars */
import { onBeforeUnmount, onMounted } from 'vue';
import { isClient } from '@vueuse/core';

let registeredEscapeHandlers: ((e: KeyboardEvent) => void)[] = [];
export const EVENT_CODE = {
  tab: 'Tab',
  enter: 'Enter',
  space: 'Space',
  left: 'ArrowLeft', // 37
  up: 'ArrowUp', // 38
  right: 'ArrowRight', // 39
  down: 'ArrowDown', // 40
  esc: 'Escape',
  delete: 'Delete',
  backspace: 'Backspace',
  numpadEnter: 'NumpadEnter',
  pageUp: 'PageUp',
  pageDown: 'PageDown',
  home: 'Home',
  end: 'End'
};

const cachedHandler = (e: Event) => {
  const event = e as KeyboardEvent;
  if (event.key === EVENT_CODE.esc) {
    registeredEscapeHandlers.forEach((registeredHandler) =>
      registeredHandler(event)
    );
  }
};

export const useEscapeKeydown = (handler: (e: KeyboardEvent) => void) => {
  onMounted(() => {
    // 如果没有已注册的 esc 按钮事件，则注册一次。往后就不需要再注册了，直接push进数组 registeredEscapeHandlers 中
    // 然后在 cachedHandler 中循环执行，避免多次注册影响性能
    if (registeredEscapeHandlers.length === 0) {
      document.addEventListener('keydown', cachedHandler);
    }
    if (isClient) registeredEscapeHandlers.push(handler);
  });

  onBeforeUnmount(() => {
    registeredEscapeHandlers = registeredEscapeHandlers.filter(
      (registeredHandler) => registeredHandler !== handler
    );
    if (registeredEscapeHandlers.length === 0) {
      if (isClient) document.removeEventListener('keydown', cachedHandler);
    }
  });
};
