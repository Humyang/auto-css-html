import Vuex from "vuex";
import Vue from "vue";
// import * as types from './types'

Vue.use(Vuex);

// const SET_ELEMENT = (state)=>{

// }
let store = new Vuex.Store({
  state: {
    element: [
      {
        id: "1",
        value: "1",
        tagType: "div",
        direction: "row",
        className: "",
        levelClassName: "",
        classObj: {},
        subset: []
      }
    ],
    elementHistory: [],
    token: ""
  },
  actions: {
    timeTravel({ commit, state, dispatch }, index) {
      commit("SET_ELEMENT", state.elementHistory[index]);
    },
    setElement({ commit, state, dispatch }, obj) {
      // state.elementHistory.push(JSON.parse(JSON.stringify(data)));

      commit("SET_ELEMENT", obj);
      commit("SET_ELEMENT_HISTORY", obj);
    }
  },
  mutations: {
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
