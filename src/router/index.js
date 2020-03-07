import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
   {
     path:'/',
     redirect:'/login'
   },
   {
     path:'/login',
     component:()=>import('@/pages/Login/Login')
   },
   {
     path:'/register',
     component:()=>import('@/pages/Register/Register')
   },
   {
     path:'/home',
     component:()=>import('@/pages/Home/Home'),
     redirect:'/user',
     children:[
       {
         path:'/user',
         component:()=>import('@/pages/Home/User'),
         meta:{
           info:'用户管理',
           isLogin:true,
           icon:'el-icon-user'
         }
       },
       {
         path:'/authority',
         component:()=>import('@/pages/Home/Authority'),
         meta:{
           info:'权限管理',
           icon:'el-icon-lock'
         }
       },
       {
         path:'/resource',
         component:()=>import('@/pages/Home/Resource'),
         meta:{
           info:'资源管理',
           icon:'el-icon-folder'
         }
       },
       {
         path:'/finance',
         component:()=>import('@/pages/Home/Finance'),
         meta:{
           info:'财务管理',
           icon:'el-icon-c-scale-to-original'
         }
       },
     ]
   },
  ]
})
