import { App } from 'vue';
import SuButton from './button';

// 导出单独组件
export { SuButton };

// 编写一个插件，实现一个install方法
export default {
  install(app: App): void {
    app.component(SuButton.name, SuButton);
  }
};
