import Switch from './switch.vue';
import { App } from 'vue';

// 导出Button组件
export { Switch };

// 导出Vue插件
export default {
  install(app: App) {
    app.component(Switch.name, Switch);
  }
};
