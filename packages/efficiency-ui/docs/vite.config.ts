import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from '../config/unocss';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // 添加JSX插件
    vueJsx(),
    Unocss(),
    VueSetupExtend()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
});
