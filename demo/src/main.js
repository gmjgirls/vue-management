import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false

import './assets/css/reset.css';   //引入重置样式
import './assets/css/common.css';  //引入公用样式

import ElementUI from 'element-ui'; // 引入JS组件
import 'element-ui/lib/theme-chalk/index.css'; // 引入css样式

import axios from 'axios'  //引入axios
import qs from 'qs'  //引入qs
import echarts from 'echarts'  // echarts
// 挂载在原型上
Vue.prototype.echarts = echarts

import local from '@/utils/local'  // 引入本地存储封装


//路由守卫
router.beforeEach((to, from, next) => {
  //获取token
  const token = window.localStorage.getItem('g_m_j_1117')
  //判断
  if(token){
    //放行
    next();
  } else{
    //如果去的是登录，直接放行
    if(to.path === '/login1'){
      next();
    }else{
      //如果去的是其他页面，跳转到登录页面
      next({path: '/login1'});
    }
    
  }
})

//挂载在原型上
Vue.prototype.req = axios;
Vue.prototype.qs = qs;


//  注册
Vue.use( ElementUI );

//阻止生产提示
Vue.config.productionTip = false;  //阻止生产提示


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
