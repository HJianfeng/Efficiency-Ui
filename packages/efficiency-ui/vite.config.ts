import { defineConfig } from 'vite';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from './config/unocss';
import path from 'path';

// https://vitejs.dev/config/
const rollupOptions = {
  external: ['vue'],
  output: {
    globals: {
      vue: 'Vue'
    },
    assetFileNames: `style.[ext]`
  }
};

export const config: any = {
  plugins: [vue(), vueJsx(), Unocss(), vueSetupExtend()],
  build: {
    rollupOptions,
    minify: 'terser',
    sourcemap: true,
    brotliSize: true,
    cssCodeSplit: true,
    lib: {
      entry: path.resolve(__dirname, './src/entry.ts'),
      name: 'EfficiencyUI',
      fileName: 'efficiency-ui',
      // 导出模块格式
      formats: ['esm', 'umd', 'iife']
    },
    outDir: path.resolve(__dirname, './dist')
  },
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom',
    // 支持tsx组件，很关键
    transformMode: {
      web: [/.[tj]sx$/]
    },
    coverage: {
      provider: 'istanbul', // or 'c8',
      reporter: ['text', 'json', 'html']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
};

export default defineConfig(config);
