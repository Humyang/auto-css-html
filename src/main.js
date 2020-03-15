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

// import "./vendors/ace.js";

Vue.use(Vant);

/* eslint-disable no-new */
let ins = new Vue({
  router,
  store,
  render: h => h(App),
  el: "#app"
});
window.parentDataset = new Dexie("dataset");
// window.componentCache = new Dexie("componentCache");
parentDataset.version(1).stores({
  dataset: "version,dataset,currentSelect,modifyFlag",
  componentCache: "id,tagName,dataset,imageBase64"
});
// componentCache.version(1).stores({
//   dataset: "id,tagName,dataset"
// });
// let db = parentDataset;
// db.dataset.put({ version: "1", dataset: {}, currentSelect: [] });
// var db = new Dexie("friend_database");

// db.version(1).stores({
//   friends: "name,shoeSize"
// });
//
// Put some data into it
//
// db.friends
//   .put({ name: "Nicolas", shoeSize: 8 })
//   .then(function() {
//     //
//     // Then when data is stored, read from it
//     //
//     return db.friends.get("Nicolas");
//   })
//   .then(function(friend) {
//     //
//     // Display the result
//     //
//     alert("Nicolas has shoe size " + friend.shoeSize);
//   })
//   .catch(function(error) {
//     //
//     // Finally don't forget to catch any error
//     // that could have happened anywhere in the
//     // code blocks above.
//     //
//     alert("Ooops: " + error);
//   });
window.INS = ins;
console.log("INS", window.INS);
