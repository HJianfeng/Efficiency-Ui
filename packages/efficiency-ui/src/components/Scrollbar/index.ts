import Scrollbar from './scrollbar.vue';
import { App } from 'vue';

// 导出Button组件
export { Scrollbar };

// 导出Vue插件
export default {
  install(app: App) {
    app.component(Scrollbar.name, Scrollbar);
  }
};
