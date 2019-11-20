import Router from 'vue-router'

import routes from './routes'

// const router = new Router({
//   routes
// })
// export default router
/* 全局import 的都是一个router， 需要每次import
   服务端渲染都会生成一个新的APP， 如果router只有一个对象，每次都会缓存每次新建的APP
   导致服务端渲染之后APP对象没有释放掉，导致内存不会释放掉，导致内存溢出 */

// 创建router实例
export default () => {
  return new Router({
    routes
  })
}
