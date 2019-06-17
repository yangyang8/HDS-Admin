import axios from "axios";
import qs from "qs";
import auth from "./auth";
import { getBaseUrl } from "../common/utils";
import { MessageBox } from "element-ui";

// axios 配置
axios.defaults.timeout = 5000;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//axios.defaults.baseURL = 'http://localhost:8008';
axios.defaults.baseURL = getBaseUrl(window.location.href);
//加上这个头信息，可以整合shiro相关的权限操作
axios.defaults.withCredentials = true
axios.defaults.headers.common[ 'authUid' ] = auth.getUid();
axios.defaults.headers.common[ 'authSid' ] = auth.getSid();
axios.defaults.withCredentials=true;

//POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method == 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use(
  response => {
    //alert(response.data.statusCode);
    if (response.data && response.data.statusCode) {
      //alert("响应数据");
      if (response.data.statusCode == 2001) {
         //MessageBox({type:"error",message:"退出登录",title:"温馨提示",});
         auth.logout();
         //
         this.$http.defaults.headers.common['authSid'] = '';
         //跳转到登录页面
         this.$router.push({path: '/login'});
      }
    }
    return response;
  },
  error => {
    if (error.response) {
      //全局ajax错误信息提示
      //MessageBox({type:"error",message:error.response.data.msg,title:"温馨提示",});
    }
    return Promise.reject(error);
  });

export function fetch (url, config = { method: 'get' }) {
  return axios.request({ ...config, url })
  // return new Promise((resolve, reject) => {
  //   axios.request({ ...config, url })
  //     .then(response => {
  //       resolve(response.data);
  //     }, err => {
  //       reject(err);
  //     })
  //     .catch((error) => {
  //       reject(error)
  //     })
  // })
}

export default axios
