export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'smile',
    path: '/jobs',
    component: './jobs',
  },
  {
    path: '/',
    redirect: '/jobs',
  },
  {
    component: './404',
  },
];
