// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'

const axios = Axios.create({
  timeout:500,    // 请求超时时间
  headers: {
    "content-type": "application/json",
    "Authorization": localStorage.getItem('token') || ''
  }
})
/*
  当退出时，没有localStorage的值
  重新登陆导致axios全局配置一开始无法取到值
  之后调用时会提示未认证

*/
Vue.prototype.$axios = axios

// 导入阿里图标库
import './assets/icon/iconfont.css'

// 全局注册滑块验证组件：
import slider from '@/components/utils/slider'
Vue.component('slider', slider)

// 引入自定义的vuex store
import store from './components/utils/store.js'

// 导入组件通信扩展
// import {$sender, $receiver} from 'vue-communication'

// Vue.prototype.$sender = $sender
// Vue.prototype.$receiver = $receiver

Vue.use(ElementUI)
Vue.config.productionTip = false

// 创建组件通信中间件
// import actions from './components/utils/actions'
// import mutations from './components/utils/mutations'
// import gettets from './components/utils/getters'

// const state = {
//   tabs:[],
//   activeName: ''  // 默认显示的tab
// }

// const store = new Vuex.Store({
//   state,
//   actions,
//   mutations,
//   gettets
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})



// export default store