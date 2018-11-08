import Vue from 'vue' // 导入vue
import ElementUI from 'element-ui' // 导入elementui
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import bus from './assets/bus.css'
Vue.use(ElementUI) // 使用这个插件

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,

  render: h => h(App)
})
