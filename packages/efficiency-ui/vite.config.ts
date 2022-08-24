/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from './config/unocss';

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
  plugins: [vue(), vueJsx(), Unocss()],
  build: {
    rollupOptions,
    minify: 'terser',
    sourcemap: true,
    brotliSize: true,
    cssCodeSplit: true,
    lib: {
      entry: './src/entry.ts',
      name: 'SmartyUI',
      fileName: 'smarty-ui',
      // 导出模块格式
      formats: ['esm', 'umd', 'iife']
    },
    outDir: './dist'
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
    }
  }
};

export default defineConfig(config);
