import Theme from 'vitepress/dist/client/theme-default/index.js'
import EfficiencyUI from '../../../src/entry';
// 主题样式
import 'vitepress-theme-demoblock/theme/styles/index.css'
// 插件的组件，主要是demo组件
import Demo from 'vitepress-theme-demoblock/components/Demo.vue'
import DemoBlock from 'vitepress-theme-demoblock/components/DemoBlock.vue'

import IconList from '../../components/icon-list.vue'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(EfficiencyUI)
    app.component('Demo', Demo)
    app.component('DemoBlock', DemoBlock)
    app.component('IconList', IconList)
  },
}