import Select from './select.vue';
import Option from './option.vue';
import OptionGroup from './options-group.vue';
import { App } from 'vue';
import './style';

// 导出Button组件
export { Select, Option, OptionGroup };

// 导出Vue插件
export default {
  install(app: App) {
    app.component(Select.name, Select);
    app.component(Option.name, Option);
    app.component(OptionGroup.name, OptionGroup);
  }
};
