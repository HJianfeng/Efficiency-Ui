import Tag from './tag.vue';
import { App } from 'vue';

// 导出Button组件
export { Tag };

// 导出Vue插件
export default {
  install(app: App) {
    app.component(Tag.name, Tag);
  }
};
