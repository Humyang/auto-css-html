import Vue from "vue";
import App from "./App";
import router from "./router/index";
import store from "./vuex/store";
import ElementUI from "element-ui";
import * as api from "@/api/index";

import "@/assets/flex.css";

import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.prototype.api = api;

import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);

/* eslint-disable no-new */
let ins = new Vue({
  router,
  store,
  render: h => h(App),
  el: "#app"
});
window.INS = ins;
console.log("INS", window.INS);
