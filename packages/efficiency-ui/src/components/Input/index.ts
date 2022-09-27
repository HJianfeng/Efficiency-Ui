import Input from './input.vue';
import { App } from 'vue';

// 导出Button组件
export { Input };

// 导出Vue插件
export default {
  install(app: App) {
    app.component(Input.name, Input);
  }
};
