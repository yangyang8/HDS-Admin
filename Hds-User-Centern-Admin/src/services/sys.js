import axios from "../common/axios";
import md5 from "../common/md5.min";
import * as api from "../api";
import defaultValue from "./default";
import { MessageBox } from "element-ui";
// import querystring from 'querystring'
import qs from 'qs'
import http from './../common/public'
import utilApi from './../common/utils';

export function login (params) {
    // let loginRequest = qs.stringify(params);
    // console.info(loginRequest)
    return http.requestPostForm('/tt/auth/userlogin',params);
}





export function loginV2 (params) {
  return new Promise((resolve, reject) => {
    
    const password=params.password;
    var salt = "1a2b3c4d";
    var str = ""+salt.charAt(0)+salt.charAt(2) + password +salt.charAt(5) + salt.charAt(4);
    const pass = md5(str);
    params.password=pass;
    console.info(pass);
    axios.post(api.LOGIN, params).then(response => {
      console.info(response.data)
      if(response.data.statusCode==1003){
              //全局ajax错误信息提示
             MessageBox({type:"error",message:response.data.msg,title:"温馨提示",});
             reject()
      }
      resolve(response.data);
    }, err => {
       MessageBox({type:"error",message:'系统错误',title:"温馨提示",});
      reject(defaultValue.login);
    })
      .catch((error) => {
        MessageBox({type:"error",message:'系统错误',title:"温馨提示",});
        reject(defaultValue.login)
      })
  })
}

/**
 * 发送请求，获取消息列表
 * @param {*} params 
 */
export function msgList (params) {
  return new Promise((resolve, reject) => {
    axios.post(api.MSG_TOP_TEN, { params }).then(response => {
      resolve(response.data);
    }, err => {
      resolve(defaultValue.msgList);
    })
      .catch((error) => {
        resolve(defaultValue.msgList)
      })
  })
}

/**
 * 发送请求，获取菜单列表
 * @param {*} params 
 */
export function menuList (params) {
  return new Promise((resolve, reject) => {
    axios.get(api.SYS_MENU_LIST, params ).then(response => {
      //console.info(response.data)
      resolve(response.data.data);
    }, err => {
      resolve(defaultValue.menuList);
    })
      .catch((error) => {
        resolve(defaultValue.menuList)
      })
  })
}


/**
 * 发送请求，获取菜单列表
 * @param {*} params 
 */
export function menuSelectList (params) {
  return new Promise((resolve, reject) => {
    axios.get(api.SYS_MENU_SELECT_LIST, params ).then(response => {
      //console.info(response.data)
      resolve(response.data.data);
    }, err => {
      resolve(defaultValue.menuList);
    })
      .catch((error) => {
        resolve(defaultValue.menuList)
      })
  })
}

/**
 * 部门列表
 * @param {*} params 
 */
export function deptList (params) {
  return new Promise((resolve, reject) => {
    axios.get(api.SYS_DEPT_SELECT_LIST, params ).then(response => {
      //console.info(response.data)
      resolve(response.data);
    }, err => {
      resolve(defaultValue.menuList);
    })
      .catch((error) => {
        resolve(defaultValue.menuList)
      })
  })
}







/**
 * 发送请求，获取资源权限列表
 * @param {*} params 
 */
export function resourceList (params) {
  return new Promise((resolve, reject) => {
    axios.get(api.SYS_RESOURCE_LIST, { params }).then(response => {
      resolve(response.data);
    }, err => {
      resolve(defaultValue.resource);
    })
      .catch((error) => {
        resolve(defaultValue.resource)
      })
  })
}


/**
 * 发送请求，获取权限列表
 * @param {} params 
 */
export function roleList (params) {
  return new Promise((resolve, reject) => {
    axios.get(api.SYS_ROLE_LIST, { params }).then(response => {
      console.info(response.data)
      resolve(response.data);
    }, err => {
      resolve(defaultValue.roleList);
    })
      .catch((error) => {
        resolve(defaultValue.roleList)
      })
  })
}


/**
 * 发送请求，获取用户列表
 * @param {*} params 
 */
export function userList (params) {
  const userList = {total:defaultValue.userList.total,records:defaultValue.userList.records.reverse()}
  return new Promise((resolve, reject) => {
    axios.get(api.SYS_USER_PAGE, { params }).then(response => {
      resolve(response.data);
    }, err => {
      resolve(userList);
    })
      .catch((error) => {
        resolve(userList)
      })
  })
}
