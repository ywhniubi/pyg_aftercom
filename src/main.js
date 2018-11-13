import Vue from 'vue' // 导入vue
import ElementUI from 'element-ui' // 导入elementui
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import './assets/bus.css'
import axios from 'axios'
Vue.use(ElementUI) // 使用这个插件

Vue.config.productionTip = false
// 导入axios

Vue.prototype.axios = axios

// 在Vue的全局变量上配置baseurl地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 在请求拦截中配置请求头
// config用来配置axios
axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = localStorage.getItem('token')
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 在响应拦截中配置data

// 添加响应拦截器
axios.interceptors.response.use(
  function (res) {
    // 对响应数据做点什么
    // console.log('拦截到了响应', res)
    // 直接返回res.data，对应的就是服务器返回的数据
    return res.data
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
