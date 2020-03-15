import Vuex from "vuex";
import Vue from "vue";
// import * as types from './types'

import uid2 from "uid2";
Vue.use(Vuex);

// const SET_ELEMENT = (state)=>{

// }
let store = new Vuex.Store({
  state: {
    preSave: [],
    dataset: {},
    preSet: {},
    element: [
      // {
      //   id: "1",
      //   value: "1",
      //   tagName: "div",
      //   direction: "row",
      //   className: "",
      //   levelClassName: "",
      //   classObj: {},
      //   subset: []
      // }
    ],
    elementHistory: [],
    token: ""
  },
  actions: {
    pushPreSave({ commit, state, dispatch }, obj) {
      commit("SET_PREVIEW_SAVE", JSON.parse(JSON.stringify(obj)));
    },
    timeTravel({ commit, state, dispatch }, index) {
      commit("SET_ELEMENT", state.elementHistory[index]);
    },
    setElement({ commit, state, dispatch }, obj) {
      parentDataset.dataset.update("1", {
        dataset: obj,
        modifyFlag: uid2(20)
      });
      commit("SET_DATASET", obj);
      commit("SET_ELEMENT_HISTORY", obj);
    }
  },
  mutations: {
    SET_LOAD_PRESET(state, data) {
      state.preSet = JSON.parse(data);
      if (state.preSet == null) {
        state.preSet = {};
      }
    },
    async SET_PRESET(state, data) {
      // let obj = state.preSet;
      // if (!obj[data.tagName]) {
      //   obj[data.tagName] = [];
      // }
      // obj[data.tagName].push(data.dataset);
      // state.preSet = JSON.parse(JSON.stringify(obj));
      // localStorage.setItem("SINGLE", JSON.stringify(state.preSet));
      // alert(111);
      // console.log(data);

      await parentDataset.componentCache.add({
        id: uid2(20),
        tagName: data.tagName,
        dataset: data.dataset
      });
    },
    SET_DATASET(state, data) {
      let d = JSON.parse(JSON.stringify(data));
      state.dataset = d;
    },
    SET_LOAD_PREVIEW(state, data) {
      state.preSave = JSON.parse(data);
      if (state.preSave == null) {
        state.preSave = [];
      }
    },
    SET_PREVIEW_SAVE(state, data) {
      let d = JSON.parse(JSON.stringify(data));
      state.preSave.push(d);
      console.log(1);
      localStorage.setItem("COMPOSE", JSON.stringify(state.preSave));
    },
    SET_ELEMENT_HISTORY(state, data) {
      let d = JSON.parse(JSON.stringify(data));
      state.elementHistory.push(d);
    },
    SET_ELEMENT(state, data) {
      // return state => {
      // console.log("set element", data);
      let d = JSON.parse(JSON.stringify(data));
      state.element = d;
      // };
    },
    updateToken(state, data) {
      localStorage.token = data;
      state.token = data;
    }
  },
  strict: true
});
if (localStorage.token) {
  store.commit("updateToken", localStorage.token);
}
export default store;
