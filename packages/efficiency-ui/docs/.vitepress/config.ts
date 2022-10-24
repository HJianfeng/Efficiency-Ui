import { demoBlockPlugin } from 'vitepress-theme-demoblock';
const sidebar = {
  '/': [
    {
      text: '开发指南',
      children: [
        {text: '安装', link: '/index'},
        {text: '快速上手', link: '/start'},
      ]
    },
    {
      text: '组件',
      children: [
        {
          text: '基础组件',children: [
            { text: 'Icon 图标', link: '/components/icon' },
            { text: 'Button 按钮', link: '/components/button' },
            { text: 'Layout 布局', link: '/components/layout' },
            { text: 'Scrollbar 滚动条', link: '/components/scrollbar' },
            { text: 'Link 链接', link: '/components/link' },
            { text: 'Input 输入框', link: '/components/input' },
            { text: 'InputNumber 数字输入框', link: '/components/input-number' },
            { text: 'Radio 单选框', link: '/components/radio' },
            { text: 'Form 表单', link: '/components/form' },
            { text: 'Switch 表单', link: '/components/switch' },
          ]
        }
      ]
    },
    { text: '导航' },
    { text: '反馈' },
    { text: '数据录入' },
    { text: '数据展示' },
    { text: '布局' }
  ]
}

const config = {
  title: "🔨 Efficiency-UI",
  description: "组件库搭建的教学模型",
  themeConfig: {
    sidebar
  },
  markdown: {
    config: (md) => {
      // 添加DemoBlock插槽
      md.use(demoBlockPlugin)
    }
  }
}
export default config;