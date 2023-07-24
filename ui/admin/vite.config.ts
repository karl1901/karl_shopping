import { type ConfigEnv, type UserConfigExport, loadEnv } from 'vite'
import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'
import viteCompression from 'vite-plugin-compression'
// @ts-expect-error
import DefineOptions from 'unplugin-vue-define-options/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver, VueUseComponentsResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import importToCDN from 'vite-plugin-cdn-import'
import UnoCSS from 'unocss/vite'

export default (configEnv: ConfigEnv): UserConfigExport => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv
  const { VITE_PUBLIC_PATH } = viteEnv
  return {
    /** 打包时根据实际情况修改 base */
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        /** @ 符号指向 src 目录 */
        '@': resolve(__dirname, './src')
      }
    },
    server: {
      https: false,
      host: true,
      port: 20001,
      open: false,
      cors: true,
      strictPort: false,
      proxy: {
        '/api': {
          target: 'https://kangxianghui.top/karl_blog/',
          ws: true,
          /** 是否允许跨域 */
          changeOrigin: true,
          /** 重写路径 */
          rewrite: (path) => path.replace('/api', '')
        }
      }
    },
    // optimizeDeps: {
    //   include: ['qs', 'mitt', 'dayjs', 'axios', 'pinia', 'js-cookie']
    //   // exclude: ['vue-demi']
    // },
    build: {
      chunkSizeWarningLimit: 2000,
      minify: 'terser',
      /** 在打包代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ['console.log']
        },
        format: {
          /** 删除注释 */
          comments: false
        }
      },
      assetsDir: 'static',
      outDir: 'dist',
      // 将node_modules中的依赖分块打包
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS(),
      DefineOptions(),
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader({ defaultImport: 'url' }),
      /** SVG */
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons/svg')],
        symbolId: 'icon-[dir]-[name]'
      }),
      visualizer(),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 0,
        algorithm: 'gzip',
        ext: '.gz',
        deleteOriginFile: false,
        filter: () => true
      }),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        imports: ['vue', 'vue-router'],
        dts: 'types/auto-imports.d.ts',
        eslintrc: {
          enabled: true // 默认 false
          // filepath: 'types/.eslintrc-auto-import.json', // 默认 "./.eslintrc-auto-import.json"
          // globalsPropValue: true // 默认 true (true | false | "readonly" | "readable" | "writable" | "writeable")
        },
        dirs: ['src/hooks/**/*', 'src/enum/**/*', 'src/store/**/*'],
        vueTemplate: true,
        defaultExportByFilename: true
      }),
      Components({
        resolvers: [
          //element-plus组件按需导入
          ElementPlusResolver(),
          VueUseComponentsResolver()
        ],
        extensions: ['vue'],
        dirs: ['src/components', 'src/layout'],
        //组件名称包含目录，防止同名组件冲突
        directoryAsNamespace: true,
        //指定类型声明文件，为true时在项目根目录创建
        dts: 'types/components.d.ts'
      }),
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()],
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            resolveStyle: (name: string) => {
              return `element-plus/theme-chalk/${name}.css`
            }
          }
        ]
      })
      // importToCDN({
      //   prodUrl: 'https://cdn.bootcdn.net/ajax/libs/{name}/{version}/{path}',
      //   modules: [
      //     {
      //       name: 'vue',
      //       var: 'Vue',
      //       path: 'vue.global.prod.min.js'
      //     },
      //     {
      //       name: 'vue-router',
      //       var: 'VueRouter',
      //       path: 'vue-router.global.min.js'
      //     },
      //     // 项目中没有直接安装vue-demi，但是pinia用到了，所以需要在引入pinia前引入vue-demi（https://github.com/vuejs/pinia/blob/v2/packages/pinia/package.json#L77）
      //     // {
      //     //   name: 'vue-demi',
      //     //   var: 'VueDemi',
      //     //   path: 'index.iife.min.js'
      //     // },
      //     {
      //       name: 'pinia',
      //       var: 'Pinia',
      //       path: 'pinia.iife.min.js'
      //     },
      //     {
      //       name: 'element-plus',
      //       var: 'ElementPlus',
      //       path: 'index.full.min.js',
      //       css: 'index.min.css'
      //     },
      //     {
      //       name: 'axios',
      //       var: 'axios',
      //       path: 'axios.min.js'
      //     },
      //     {
      //       name: 'dayjs',
      //       var: 'dayjs',
      //       path: 'dayjs.min.js'
      //     }
      //   ]
      // })
    ]
  }
}
