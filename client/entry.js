import Vue from 'vue'
import VueRouter from 'vue-router'
import APP from './app.vue'
import './assets/styles/test.css'
import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'
import Vuex from 'vuex'

// 使用插件不需要创建Dom
// const root = document.createElement('div')
// document.body.appendChild(root)

// 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
Vue.use(VueRouter) // vue插件的使用方式
Vue.use(Vuex)
const router = createRouter()
const store = createStore() // 创建store

router.beforeEach((to, from, next) => {
  next()
  console.log('【entry】before each invoked')
  // if (to.fullPath === '/login') {
  //   next() // 执行next才会跳转
  //   // next({ path: '/login' })
  // }
})

router.beforeResolve((to, from, next) => {
  next() // 执行next才会跳转
  console.log('【entry】before Resolve invoked')
})

router.afterEach((to, from) => {
  console.log('【entry】before afterEach invoked')
})
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
new Vue({
  router, // 挂载 router对象
  store,
  render: (h) => h(APP)
}).$mount('#root')
