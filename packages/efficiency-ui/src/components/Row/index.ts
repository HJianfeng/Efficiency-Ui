import Row from './row.vue';
import { App } from 'vue';

// 导出Button组件
export { Row };

// 导出Vue插件
export default {
  install(app: App) {
    app.component(Row.name, Row);
  }
};
