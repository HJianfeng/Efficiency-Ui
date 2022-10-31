import Popper from './popper.vue';
import EfPopperTrigger from './trigger.vue';
import EfPopperContent from './content.vue';
import EfPopperArrow from './arrow.vue';
import { App } from 'vue';

// 导出Button组件
export { Popper, EfPopperTrigger, EfPopperContent, EfPopperArrow };

export * from './popper';
export * from './trigger';
export * from './content';
export * from './arrow';

// 导出Vue插件
export default {
  install(app: App) {
    app.component(Popper.name, Popper);
  }
};

export type ElPopperArrowTrigger = InstanceType<typeof EfPopperTrigger>;
export type ElPopperArrowInstance = InstanceType<typeof EfPopperArrow>;
export type ElPopperArrowContent = InstanceType<typeof EfPopperContent>;
