import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode:"history",
  routes: [
    {
      path: '/login',
      name:"login",
      meta: {
        title: '登陆'
      },
      component: resolve => require(['@/view/login/index.vue'], resolve),
    },
    {
      path: '/',
      component: resolve => require(['@/view/index/home.vue'], resolve),
      children:[
        {
          path: '/index',
          // alias: '/index',
          name:"index",
          meta: {
            title: '首页'
          },
          component: resolve => require(['@/view/index/index.vue'], resolve),
        }, 
        {
          path: '/plan',
          name:"plan",
          meta: {
            title: '计划'
          },
          component: resolve => require(['@/view/plan/index.vue'], resolve),
        }, 
        {
          path: '/scq',
          name:"scq",
          meta: {
            title: '生成器'
          },
          component: resolve => require(['@/view/scq/index.vue'], resolve),
        }
        // , 
        // {
        //   path: '/chart',
        //   name:"chart",
        //   meta: {
        //     title: '图标'
        //   },
        //   component: resolve => require(['@/view/plan/index.vue'], resolve),
        // }, 
        
      ]
    },
    {
      path: '*',
      meta: {
        title: '404'
      },
      component: resolve => require(['@/view/404/index.vue'], resolve),
    }
  ]
})

export default router;