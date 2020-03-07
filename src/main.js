// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/reset.css'

Vue.prototype.$axios = axios
Vue.use(ElementUI);
//axios请求简单的封装  优化页面 节省代码
axios.defaults.baseURL = 'http://139.196.5.252/systemport/'


Vue.config.productionTip = false


//多次请求一条路由报错问题
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//登录路由守卫
router.beforeEach((to,from,next)=>{
  if(to.meta.isLogin ===true){
    if(sessionStorage.getItem('key') === 'true'){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
  render: h => h(App)
})
