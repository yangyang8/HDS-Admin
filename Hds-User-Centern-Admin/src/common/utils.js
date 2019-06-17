import pathToRegexp from "path-to-regexp";

let SIGN_REGEXP = /([yMdhsm])(\1*)/g;
let DEFAULT_PATTERN = 'yyyy-MM-dd';
import jwtDecode from 'jwt-decode'
import { Message } from 'element-ui';



export const getSessionKey = (key, defaultValue) => {
  const item = window.sessionStorage.getItem(key);
  if (item == undefined && defaultValue != undefined) {
    return defaultValue
  }
  return item;
}

export const getBaseUrl = (url) => {
  var reg = /^((\w+):\/\/([^\/:]*)(?::(\d+))?)(.*)/;
  reg.exec(url);
  return RegExp.$1;
}

export const keyMirror = (obj) => {
  let key
  let mirrored = {}
  if (obj && typeof obj === 'object') {
    for (key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        mirrored[ key ] = key
      }
    }
  }
  return mirrored
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = array.map(item => ({ ...item }))
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[ data[ index ][ id ] ] = data[ index ]
  })

  data.forEach((item) => {
    let hashVP = hash[ item[ pid ] ]
    if (hashVP) {
      !hashVP[ children ] && (hashVP[ children ] = [])
      hashVP[ children ].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

export function getCurrentMenu (location, arrayMenu) {
  if (!!arrayMenu) {
    let current = []
    for (let i = 0; i < arrayMenu.length; i++) {
      const e = arrayMenu[ i ];
      const child = getCurrentMenu(location, e.children);
      if (!!child && child.length > 0) {
        child.push({ ...e, children: null });
        return child;
      }
      if (e.href && pathToRegexp(e.href).exec(location)) {
        current.push({ ...e, children: null });
        return current;
      }
    }
    return current;
  }
  return null;
}



function padding(s, len) {
  var len = len - (s + '').length;
  for (var i = 0; i < len; i++) {
    s = '0' + s;
  }
  return s;
};

export default {
  // getActiveUser:function(){
  //   let activeUserStr = this.getSession("activeUser");
  //   return JSON.parse(activeUserStr);
  // },
  getActiveUser: function(){
    let uid = this.getCookie("uid")
    if(uid){
      let activeUserStr = this.getUserSession("activeUser");
      return JSON.parse(activeUserStr);
    }else{
      this.delUserSession("activeUser")
    }
  },
//获取jwt令牌
  getJwt : function(){
    let activeUser = this.getActiveUser()
    if(activeUser){
      return activeUser.jwt
    }
  },
  //解析jwt令牌，获取用户信息
  getUserInfoFromJwt : function (jwt) {
    if(!jwt){
      return ;
    }
    var jwtDecodeVal = jwtDecode(jwt);
    if (!jwtDecodeVal) {
      return ;
    }
    let activeUser={}
    //console.log(jwtDecodeVal)
    activeUser.utype = jwtDecodeVal.utype || '';
    activeUser.username = jwtDecodeVal.name || '';
    activeUser.userpic = jwtDecodeVal.userpic || '';
    activeUser.userid = jwtDecodeVal.userid || '';
    activeUser.authorities = jwtDecodeVal.authorities || '';
    activeUser.uid = jwtDecodeVal.jti || '';
    activeUser.jwt = jwt;
    return activeUser;
  },
  checkActiveUser:function(){
    // var jwt = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjEyNjMzNjUsInVzZXJfbmFtZSI6IjEyMyIsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iLCJnZXRSZXNvdXJjZSJdLCJqdGkiOiI3NmIxOTgzMi01MDk3LTQyMDMtYjhjMS1kOGI1N2ZmMmZhOTAiLCJjbGllbnRfaWQiOiJtYW5hZ2VyIiwic2NvcGUiOlsibWFuYWdlciJdfQ.MzycLCC9cR-905ilrd1bWH52nqto4MDYbbMSXgcRdVkUGlv2A2JrlIvbvxNc2BVug1L59AV_7hUa_SHZQgrOdHnyoMdcu5KoHHXsJi1O5wUXkuahc-K3KoBhwkyWY9O-DvwZhrmzsYN2gb_3qmU2xbHu6U1pwwscXGHjbKJDoWGdrmMkRc1cpxuqvH-0eusR1GLQ4gTBSyVNW4XVO7jMt9ATBubos7GhtbAMXnCQVO9pui2zvPvKVxlvwMjJowjdCc_5hvXjyUvWgbU1qUrdtXeskeT-HoVUtsol6OnFHnq7o9bIin1493ZwjDck_0R1R8mkGRGKylQtZdzESeQpYA';
    var jwt_base64 = this.getCookie("juid");
    if (jwt_base64 ) {
      let jwt = Base64.decode(jwt_base64)
      var jwtDecodeVal = jwtDecode(jwt);
      //console.log(jwtDecodeVal);
//    var user = sessionStorage.getItem('user');
      if (jwtDecodeVal) {

//      user = JSON.parse(user);
        let activeUser={}
        //console.log(jwtDecodeVal)
        activeUser.utype = jwtDecodeVal.utype || '';
        activeUser.username = jwtDecodeVal.user_name || '';
        activeUser.userpic = jwtDecodeVal.userpic || '';
        activeUser.userid = jwtDecodeVal.userid || '';
        activeUser.authorities = jwtDecodeVal.authorities || '';
        activeUser.menus = jwtDecodeVal.menus || '';

        this.setSession("activeUser",JSON.stringify(activeUser))
        return this.getUserSession("activeUser")
      }

    }
    return null;
  },
  checkAuthorities: function(router,permission){
    if(permission !='Login' && permission !='Logout'){//校验权限
      let activeUser = this.getActiveUser()
      let authorities = activeUser.authorities;
      if (!authorities) {
        Message.error('对不起您没有此操作权限！');
        //跳转到统一授权失败页面
        window.location = "http://ucenter.xuecheng.com/#/denied?returnUrl="+Base64.encode(window.location)
/*        router.push({
          path: '/login'
        })*/
      }
      //console.log(authorities)
      var ret1 = authorities.find((value, index, arr) => {
        return value == permission;
      })
      if (!ret1) {
        Message.error('对不起您没有此操作权限！');
        //跳转到统一授权失败页面
        window.location = "http://ucenter.xuecheng.com/#/denied?returnUrl="+Base64.encode(window.location)
        /*router.push({
          path: '/login'
        })*/
      }
    }
  },
  checkmenu(routeValue,authorities){
    if(routeValue.meta && routeValue.meta.permission){
      let permission = routeValue.meta.permission
      // console.log(routeValue);
      var ret1 = authorities.find((value, index, arr) => {
        return value == permission;
      })
      if (!ret1) {
        //将菜单 隐藏
        routeValue.hidden = true
      }
    }
  },

  getCookie: function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    console.info("getCookie="+document.cookie.match(reg))
    if (arr = document.cookie.match(reg))
      return (arr[2]);
    else
      return null;
  },



  //读取cookie
//  getCookie:function(param) {
//    console.info("name="+param)
//   var c_param = '';
//   if (document.cookie.length > 0) {
//     var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
//     for (var i = 0; i < arr.length; i++) {
//       var arr2 = arr[i].split('='); //再次切割
//       //判断查找相对应的值
//       if (arr2[0] == param) {
//         c_param = arr2[1];
//         //保存到保存数据的地方
//       }
//     }
//     console.info("getCookie="+c_param)
//     return c_param;
//   }
// },





  setCookie: function (c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  },
  delCookie: function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
  setSession: function (key, value) {
    return sessionStorage.setItem(key, value);
  },
  getUserSession: function (key) {
    return sessionStorage.getItem(key);
  },
  setUserSession : function (key, value) {
    return sessionStorage.setItem(key, value);
  },
  delUserSession :function (key) {
    return sessionStorage.removeItem(key)
  },
  getQueryStringByName: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var context = "";
    if (r != null)
      context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
  },
  formatDate: function (date, pattern) {
    pattern = pattern || DEFAULT_PATTERN;
    return pattern.replace(SIGN_REGEXP, function ($0) {
      switch ($0.charAt(0)) {
        case 'y':
          return padding(date.getFullYear(), $0.length);
        case 'M':
          return padding(date.getMonth() + 1, $0.length);
        case 'd':
          return padding(date.getDate(), $0.length);
        case 'w':
          return date.getDay() + 1;
        case 'h':
          return padding(date.getHours(), $0.length);
        case 'm':
          return padding(date.getMinutes(), $0.length);
        case 's':
          return padding(date.getSeconds(), $0.length);
      }
    });
  },
  parseDate: function (dateString, pattern) {
    var matchs1 = pattern.match(SIGN_REGEXP);
    var matchs2 = dateString.match(/(\d)+/g);
    if (matchs1.length == matchs2.length) {
      var _date = new Date(1970, 0, 1);
      for (var i = 0; i < matchs1.length; i++) {
        var _int = parseInt(matchs2[i]);
        var sign = matchs1[i];
        switch (sign.charAt(0)) {
          case 'y':
            _date.setFullYear(_int);
            break;
          case 'M':
            _date.setMonth(_int - 1);
            break;
          case 'd':
            _date.setDate(_int);
            break;
          case 'h':
            _date.setHours(_int);
            break;
          case 'm':
            _date.setMinutes(_int);
            break;
          case 's':
            _date.setSeconds(_int);
            break;
        }
      }
      return _date;
    }
    return null;
  }

}
