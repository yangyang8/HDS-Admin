import dashboard from "../pages/dashboard.vue";
import NotFoundView from "../components/404.vue";
import menuList from "../pages/sys/menu.vue";
import role from "../pages/sys/role.vue";
import dept from "../pages/sys/dept.vue";
import resource from "../pages/sys/resource.vue";
import login from "../pages/login.vue";
import app from "../App.vue";
import sysUser from "../pages/sys/user.vue";
import userAdd from "../pages/sys/userAdd.vue";
import resetPwd from "../pages/resetPwd.vue";
import registerUser from "../pages/register.vue";
// Routes
const routes = [
  {path: '/login', component: login},
  {
    path: '/test', component: app, children: [
    {path: '*', component: NotFoundView}
  ]
  },
  {
    path: '/', component: app, children: [
    {path: '/resetPwd', component: resetPwd},
    {path: '/register', component: registerUser},

    
    {path: '/index', component: dashboard},
    {path: '/common/menuList', component: menuList},
    {path: '/common/roleList', component: role},
    {path: '/common/deptList', component: dept},
    {path: '/common/userList', component: sysUser},
    {path: '/common/userAdd', component: userAdd},
    {path: '/common/resource', component: resource}
  ]
  },
  {path: '*', component: NotFoundView}
]


export default routes

