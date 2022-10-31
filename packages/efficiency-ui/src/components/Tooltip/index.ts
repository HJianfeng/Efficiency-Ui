import Tooltip from './tooltip.vue';
import { App } from 'vue';

// 导出Button组件
export { Tooltip };
export * from './tooltip';
export * from './tokens';
// 导出Vue插件
export default {
  install(app: App) {
    app.component(Tooltip.name, Tooltip);
  }
};
