import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        loginUserInfo:"",
        loginToken:'' || sessionStorage.getItem("token"),
        allNewsList:''
    },
    getters:{
        loginUserInfo: state => {
            if(!state.loginUserInfo){
                return JSON.parse(sessionStorage.getItem("loginUserInfo"));
            }else {
                return state.loginUserInfo;
            }
        }
    },
    mutations:{
        saveUser(state,userInfo){
           state.loginUserInfo = userInfo;
           sessionStorage.setItem("loginUserInfo",JSON.stringify(userInfo));
        },
        saveToken(state,token){
            state.loginToken = token;
            sessionStorage.setItem("token",token)
        },
        //保存所有新闻数据
        saveNewsList(state,list) {
            state.allNewsList = list;
        },
        //退出登录把用户新闻置为空
        clearLoginUserInfo(state){
            state.loginUserInfo = ''
        }
    }
})