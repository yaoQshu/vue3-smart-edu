import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/user',
    name: '/user',
    redirect: { name: `/student` },
    meta: {
      title: '用户信息',
      icon: 'ant-design:desktop-outlined',
    },
    children: [
      {
        path: '/student',
        name: '/student',
        meta: {
          title: '学生信息',
          icon: 'ant-design:desktop-outlined',
          keepAlive: false,
        },
        component: () => import('@/views/user/student/index.vue'),
      },
      {
        path: '/teacher',
        name: '/teacher',
        meta: {
          title: '教师信息',
          icon: 'ant-design:desktop-outlined',
          keepAlive: false,
        },
        component: () => import('@/views/user/teacher/index.vue'),
      },
    ],
  },
  {
    path: '/base',
    name: '/base',
    redirect: { name: `/department` },
    meta: {
      title: '基础信息',
      icon: 'ant-design:desktop-outlined',
    },
    children: [
      {
        path: '/department',
        name: '/department',
        meta: {
          title: '部门管理',
          icon: 'ant-design:desktop-outlined',
          keepAlive: false,
        },
        component: () => import('@/views/base/department/index.vue'),
      },
      {
        path: '/role',
        name: '/role',
        meta: {
          title: '角色管理',
          icon: 'ant-design:desktop-outlined',
          keepAlive: false,
        },
        component: () => import('@/views/base/role/index.vue'),
      },
    ],
  },
];

export default routes;
