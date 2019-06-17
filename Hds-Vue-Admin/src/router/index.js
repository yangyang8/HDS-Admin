import Vue from "vue";
import VueRouter from "vue-router";
import routeConfig from "./routes";
import {sync} from "vuex-router-sync";
import store from "../store";
import types from "../store/mutation-types";
import auth from "../common/auth";
import axios from "../common/axios";
import * as systemApi from '../common/system';
//import systemApi from '../common/system';
import utilApi from '../common/utils';


let sysConfig = require('@/../config/sysConfig')
let openAuthenticate = sysConfig.openAuthenticate
let openAuthorize = sysConfig.openAuthorize
let Base64 = require('js-base64').Base64;
//加载路由中间件
Vue.use(VueRouter)
Vue.use(axios);

//定义路由
const router = new VueRouter({
  routes: routeConfig,
  //mode: 'history'
})

sync(store, router)

const {state} = store

// router.beforeEach((route, redirect, next) => {
//   if (state.device.isMobile && state.sidebar.opened) {
//     store.commit(types.TOGGLE_SIDEBAR, false)
//   }

//   if(!auth.loggedIn() && route.path == '/register'){
//       next({
//         path: '/register',
//         query: {redirect: route.fullPath}
//       })
//   }

//   //没有登录，则跳转到登录页面
//   else if (!auth.loggedIn() && route.path !== '/login') {
    
//       //alert(route.fullPath)

//       next({
//         path: '/login',
//         query: {redirect: route.fullPath}
//       })
    

//   } else {

//     next()
//   }
// })


axios.defaults.withCredentials=true;
router.beforeEach((to, from, next) => {
  if(openAuthenticate){

    // console.log(to)
    // console.log(from)
    //***********身份校验***************
    let activeUser
    let uid
    try{
      activeUser = utilApi.getActiveUser()
      uid = utilApi.getCookie("uid")
    }catch(e){
      //alert(e)
    }
    if(activeUser && uid && uid == activeUser.uid) {
      next();
    }else if(to.path =='/login'||to.path =='/userlogin' || to.path =='/userlogout'|| to.path =='/register'){
      // alert("userlogin")
      next();
    }else if(uid){

      //请求获取jwt
      systemApi.getjwt().then((res)=>{
        if(res.success){
          let jwt = res.jwt;
          let activeUser = utilApi.getUserInfoFromJwt(jwt)
          if(activeUser){
            utilApi.setUserSession("activeUser",JSON.stringify(activeUser))
          }
          next();
        }else{
          //跳转到统一登陆
         window.location = "http://localhost:9000/#/login?returnUrl="+ Base64.encode(window.location)
        //  window.location = "http://localhost:9001/#/login?returnUrl="+ window.location
        }
      })
    }else{
      //跳转到统一登陆
      window.location = "http://localhost:9000/#/login?returnUrl="+ Base64.encode(window.location)
      // window.location = "http://localhost:9001/#/login?returnUrl="+ window.location
    }
  }else{
    next();
  }

});

// 添加请求拦截器，实现http请求添加Authorization头信息
axios.interceptors.request.use(function (config) {
  // 在发送请求向header添加jwt
  let jwt = utilApi.getJwt()
  if(jwt){
    config.headers['Authorization'] = 'Bearer '+jwt
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});


export default router
