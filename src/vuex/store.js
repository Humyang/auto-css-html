
import Vuex from 'vuex'
import Vue from 'vue'
// import * as types from './types'

Vue.use(Vuex);

 let store = new Vuex.Store({
    state:{
        token:''
    },
    mutations:{
        updateToken(state,data){
            localStorage.token = data
            state.token = data
            // console.log('data-----',data)
            // localStorage.permission = JSON.stringify(data)
            // state.permission = data
        }
    },
    getters:{
        getPermissionByCode:(state)=>(code)=>{
            // let isTrue =  state.permission.find(item=>{
            //     if(item.code == code){
            //         return true
            //     }
            // })
            // return new Promise((reslove,reject)=>{
            //     if(isTrue){
            //         reslove(true)
            //     }else{
            //         reject(false)
            //     }
            // })
        }
    }
})
if (localStorage.token) {
    store.commit('updateToken', localStorage.token)
}
export default store