// core
import { createApp } from 'vue'
import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import '@/router/permission'
import { loadSvg } from '@/icons'
import { loadDirectives } from '@/directives'
import 'uno.css'
import 'normalize.css'
import '@/styles/index.scss'
import '@/styles/iconfont.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

const app = createApp(App)

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

loadSvg(app)
loadDirectives(app)
app.use(hljsVuePlugin)
app.use(store).use(router)
router.isReady().then(() => {
  app.mount('#app')
})
