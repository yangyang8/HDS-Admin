// export const CONTEXT = './api';
//export const CONTEXT = './Vue-Admin';
export const CONTEXT = 'http://localhost:40400/auth';

// /openapi/auth/userlogin
export const USERLOGIN = CONTEXT + '/login';
export const LOGIN = CONTEXT + '/doLogin';
export const LOGOUT = CONTEXT + '/doLogout';
export const CHANGE_PWD = CONTEXT + '/changePwd';

export const SYS_MENU_GET = CONTEXT + '/common/menu/get';
export const SYS_MENU_UPDATE = CONTEXT + '/common/menu/update';
export const SYS_MENU_DELETE = CONTEXT + '/common/menu/delete';
export const SYS_MENU_ADD = CONTEXT + '/common/menu/add';
export const SYS_MENU_PAGE = CONTEXT + '/sys/menu/page';
export const SYS_MENU_LIST = CONTEXT + '/common/menu/getMenuList';
export const SYS_MENU_SELECT_LIST = CONTEXT + '/common/menu/findSelectTreeMenuList';
export const SYS_MENU_LIST2 = CONTEXT + '/sys/menu/list2';
//findSelectTreeRoleList
export const SYS_ROLE_GET = CONTEXT + '/common/role/get';
export const SYS_ROLE_UPDATE = CONTEXT + '/common/role/update';
export const SYS_ROLE_DELETE = CONTEXT + '/common/role/delete';
export const SYS_ROLE_ADD = CONTEXT + '/common/role/add';
export const SYS_ROLE_PAGE = CONTEXT + '/common/role/page';
export const SYS_ROLE_LIST = CONTEXT + '/common/role/findSelectTreeRoleList';






//部门管理

export const SYS_DEPT_GET = CONTEXT + '/common/dept/get';
export const SYS_DEPT_UPDATE = CONTEXT + '/common/dept/update';
export const SYS_DEPT_DELETE = CONTEXT + '/common/dept/delete';
export const SYS_DEPT_ADD = CONTEXT + '/common/dept/add';
export const SYS_DEPT_PAGE = CONTEXT + '/common/dept/page';
export const SYS_DEPT_SELECT_LIST = CONTEXT + '/common/dept/findSelectTreeDeptList';






export const SYS_ROLE_LIST2 = CONTEXT + '/sys/role/list2';
export const SYS_ROLE_RESOURCE = CONTEXT + '/sys/role/resources';
export const SYS_SET_ROLE_RESOURCE = CONTEXT + '/sys/role/setResources';

export const SYS_RESOURCE_GET = CONTEXT + '/sys/resource/get';
export const SYS_RESOURCE_UPDATE = CONTEXT + '/sys/resource/update';
export const SYS_RESOURCE_DELETE = CONTEXT + '/sys/resource/delete';
export const SYS_RESOURCE_ADD = CONTEXT + '/sys/resource/add';
export const SYS_RESOURCE_PAGE = CONTEXT + '/sys/resource/page';
export const SYS_RESOURCE_LIST = CONTEXT + '/sys/resource/list';
export const SYS_RESOURCE_LIST2 = CONTEXT + '/sys/resource/list2';

export const SYS_USER_GET = CONTEXT + '/sys/user/get';
export const SYS_USER_ADD = CONTEXT + '/sys/user/add';
export const SYS_USER_UPDATE = CONTEXT + '/sys/user/update';
export const SYS_USER_DELETE = CONTEXT + '/sys/user/delete';
export const SYS_USER_PAGE = CONTEXT + '/sys/user/page';
export const SYS_USER_ROLE = CONTEXT + '/sys/user/roleIds';
export const SYS_SET_USER_ROLE = CONTEXT + '/sys/user/setRoles';

export const MSG_TOP_TEN = CONTEXT + '/messageList';
export const TEST_DATA = CONTEXT + '/static/data/data.json';

