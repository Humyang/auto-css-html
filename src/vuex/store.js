import Vuex from "vuex";
import Vue from "vue";
// import * as types from './types'

Vue.use(Vuex);

// const SET_ELEMENT = (state)=>{

// }
let store = new Vuex.Store({
  state: {
    preSave: [],
    dataset: [],
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
      // state.elementHistory.push(JSON.parse(JSON.stringify(data)));

      commit("SET_DATASET", obj);
      commit("SET_ELEMENT_HISTORY", obj);
    }
  },
  mutations: {
    SET_PRESET(state, data) {
      let obj = state.preSet;
      if (!obj[data.tagName]) {
        obj[data.tagName] = [];
      }
      obj[data.tagName].push(data.dataset);
      state.preSet = JSON.parse(JSON.stringify(obj));
    },
    SET_DATASET(state, data) {
      let d = JSON.parse(JSON.stringify(data));
      state.dataset = d;
    },
    SET_PREVIEW_SAVE(state, data) {
      let d = JSON.parse(JSON.stringify(data));
      state.preSave.push(d);
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
