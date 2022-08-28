import Col from './col.vue';
import { App } from 'vue';

// 导出Button组件
export { Col };

// 导出Vue插件
export default {
  install(app: App) {
    app.component(Col.name, Col);
  }
};
