import InputNumber from './input-number.vue';
import { App } from 'vue';

// 导出Button组件
export { InputNumber };

// 导出Vue插件
export default {
  install(app: App) {
    app.component(InputNumber.name, InputNumber);
  }
};
