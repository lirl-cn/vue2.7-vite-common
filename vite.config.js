/** @type {import('vite').UserConfig} */
import { defineConfig, loadEnv } from "vite";
import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import defaultConfig from './config/defaultConfig'
import legacy from '@vitejs/plugin-legacy'
import Components from 'unplugin-vue-components/vite'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import { splitVendorChunkPlugin } from 'vite'
import viteCompression from 'vite-plugin-compression'
import antdvFix from 'vite-plugin-antdv-fix' // 解决antd-vue date引入moment.js 方式会导致页面出错的问题

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env, mode, command)
  return {
    plugins: [
      vue(),
      vueJsx({
        // vModel: false,
        compositionAPI: true,
      }),
      antdvFix(),
      viteCommonjs(),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      splitVendorChunkPlugin(),
      Components(),
      viteCompression(),
    ],
    server: {
      proxy: {
        [defaultConfig.proxyBaseUrl]: {
          target: defaultConfig.proxyTargetUrl,
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            // "^/xxl": ""
          }
        }
      }
    },
    resolve: {
      alias: {
        '@@/': __dirname + '/',
        '@/': __dirname + '/src/',
        '~/': __dirname + '/node_modules/',
      },
      extensions: ['.js', '.mjs', '.ts', '.jsx', '.tsx', '.vue', '.json'],
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        scss: {
          charset: false,
          //需要在styles下创建对应的文件common.scss
          additionalData: '@import "./src/styles/common.scss";',
        },
        less: {
          charset: false,
          javascriptEnabled: true,
          // additionalData: '@import "./src/styles/global.less";',
          modifyVars: {
            'primary-color': '#1890FF',
            'link-color': '#1890FF',
            'border-radius-base': '4px',
            'btn-height-lg': '44px',
            'font-size-base': '14px',
            'font-size-lg': '14px',
            'input-color': '#262626',
            'input-border-color': '#E5E5E5',
            'input-height-lg': '44px',
            'input-padding-horizontal-lg': '16px',
            'input-padding-vertical-lg': '12px',
            'select-border-color': '#E5E5E5',
            'select-padding-horizontal-lg': '16px',
            'select-padding-vertical-lg': '12px',
            'alert-warning-bg-color': '#FDF6ED',
            'alert-warning-border-color': '#FBECCD',
          },
        },
      },
    },
    define: {
      DEFAULT_CONFIG: defaultConfig,
    },
    optimizeDeps: {
      //   esbuildOptions: {
      //     plugins: [esbuildCommonjs()]
      //   }
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment'
    },
    hmr: true,
    build: {
      target: 'es2015',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: {
            'element-ui': ['element-ui'],
            'ant-design-vue': ['ant-design-vue'],
          },
        },
      },
      commonjsOptions: {
        transformMixedEsModules: true,
        ignoreTryCatch: false,
      },
      dynamicImportVarsOptions: {},
    },
  }
})
