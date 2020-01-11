import Notification from './notification.vue'
import notify from './function'
// 在使用vue.install时候会接受一个参数，
// 全局注册 Notification
export default (Vue) => {
  Vue.component(Notification.name, Notification)
  // 每个组件都可以直接调用
  Vue.prototype.$notify = notify
}
