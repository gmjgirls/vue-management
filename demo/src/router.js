import Vue from 'vue'
import Router from 'vue-router'

//注册路由
Vue.use(Router)

export default new Router({  //创建路由实例对象且暴露出去
    routes:[
        {path:'/',redirect:'/login1'},   //根据目录重定向到login
        {path:'/login1',component: () => import('./views/Login1/Login1.vue')},  //登录
        {
          path:'/home1', 
          component: () => import('./views/Home1/Home1.vue'),   //父组件
          redirect:'/home1/systeminfo1',
          children:[   //子组件
              // 账号管理
              {path:'/home1/accountmanage1',component: () => import('./views/AccountManage1/AccountManage1.vue')}, 
              //账号添加 
              {path:'/home1/accountadd1',component: () => import('./views/AccountAdd1/AccountAdd1.vue')},  
              //密码修改
              {path:'/home1/passwordmodify1',component: () => import('./views/PasswordModify1/PasswordModify1.vue')},
              
              //商品管理
              {path:'/home1/goodsmanage1',component: () => import('./views/GoodsManage1/GoodsManage1.vue')},  
              //添加商品
              {path:'/home1/goodsadd1',component: () => import('./views/GoodsAdd1/GoodsAdd1.vue')}, 

              //统计管理
              //销货统计
              {path:'/home1/selltotal1',component: () => import('./views/SellTotal1/SellTotal1.vue')},  
              //进货统计
              {path:'/home1/stocktotal1',component: () => import('./views/StockTotal1/StockTotal1.vue')},
              
              //系统管理
              {path:'/home1/systeminfo1',component: () => import('./views/SystemInfo1/SystemInfo1.vue')},

              //个人中心
              {path:'/home1/personal1',component: () => import('./views/Personal1/Personal1.vue')},

          ]
        
        },  
        
    ]

})
