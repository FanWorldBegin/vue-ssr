export default [
  {
    path: '/',
    redirect: '/app' // 默认路由跳转
  },
  {
    // path: '/app/:id',
    path: '/app',
    props: true,
    // props: (route) => ({ id: route.query.b }),
    component: () => import('../views/todo/todo.vue'),
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    name: 'appName',
    meta: {
      title: 'this iƒs app',
      description: 'ceshiceshi1'
    },
    // children: [{
    //   path: 'test',
    //   component: Login
    // }]
    beforeEnter (to, from, next) {
      console.log('【routes】app route before enter')
      next() // 只有执行next 才会进入
    }
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
  // {
  //   path: '/login/exact',
  //   components: {
  //     default: Login,
  //     a: Todo
  //   }
  // }
]
