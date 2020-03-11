import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      meta: {
        title: "登陆"
      },
      component: resolve => require(["@/view/login/index.vue"], resolve)
    },
    {
      path: "/",
      component: resolve => require(["@/view/index/home.vue"], resolve),
      redirect: "/scq",
      children: [
        // {
        //   path: '/index',
        //   // alias: '/index',
        //   name:"index",
        //   meta: {
        //     title: '首页'
        //   },
        //   component: resolve => require(['@/view/index/index.vue'], resolve),
        // },
        {
          path: "/scq",
          name: "scq",
          meta: {
            title: "生成器"
          },
          component: resolve => require(["@/view/scq/index.vue"], resolve)
        },
        {
          path: "/realview",
          name: "realview",
          meta: {
            title: "生成器"
          },
          component: resolve => require(["@/view/scq/realview.vue"], resolve)
        },
        {
          path: "/preview",
          name: "preview",
          meta: {
            title: "预览"
          },
          component: resolve => require(["@/view/scq/preview.vue"], resolve)
        },
        {
          path: "/pdsc",
          name: "pdsc",
          meta: {
            title: "片段生成"
          },
          component: resolve => require(["@/view/pdsc/index.vue"], resolve)
        },

        {
          path: "/scroll_wxxcx",
          name: "scq",
          meta: {
            title: "微信小程序滚动加载"
          },
          component: resolve =>
            require(["@/view/scroll_wxxcx/index.vue"], resolve)
        },
        {
          path: "/qiongju",
          name: "scq",
          meta: {
            title: "穷举"
          },
          component: resolve => require(["@/view/qiongju/index.vue"], resolve)
        }
      ]
    },
    {
      path: "*",
      meta: {
        title: "404"
      },
      component: resolve => require(["@/view/404/index.vue"], resolve)
    }
  ]
});

export default router;
