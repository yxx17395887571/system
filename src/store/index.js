import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        isLogin:false,
        account:'',
        usermail:''
    },
    mutations:{
        VERIFYLOGIN(state,data){
            state.isLogin = data
        },
        USERMSG(state,data){
            state.account = data
        },
        EMAILMSG(state,data){
            state.usermail = data
        },

    },
    actions:{

    },
    getters:{
        
    }
})
