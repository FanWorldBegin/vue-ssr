import Component from './func-notification'
import Vue from 'vue'
// 使用Vue.extend 创建一个组件 也可以使用new vue
const NotificationConstructor = Vue.extend(Component)
// 2.可能有多个组件
const instances = []

// 3.生成组件id
let seed = 1

// 删除节点
const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(inst => instance.id === inst.id)
  // 删掉节点
  instances.splice(index, 1)

  if (len <= 1) return

  const removeHeight = instance.height
  console.log(removeHeight, 'removeHeight')
  for (let i = index; i < len; i++) {
    console.log('instances[i]', instances[i])
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset - removeHeight - 16)
    console.log('instances[i].verticalOffset', instances[i].verticalOffset)
  }
}

// 1. 要控制组件定位
const notify = (options) => {
  const {
    autoClose,
    ...rest
  } = options
  // 判断是服务端则不处理，需要进行dom操作
  if (Vue.prototype.$isServer) return
  const instance = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })
  const id = `notification_${seed++}`
  instance.id = id
  // 生成$el 对象，但没有插入页面
  const vm = instance.$mount()
  document.body.appendChild(vm.$el)
  vm.visible = true // 显示组件
  // 计算高度
  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
    console.log(verticalOffset)
  })
  // 与默认边框的距离
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  // 监听关闭事件
  vm.$on('closed', () => {
    console.log('closed')
    // 删除节点
    removeInstance(instance)
    // 删除dom 节点
    document.body.removeChild(vm.$el)
    // 只会删除vm对象销毁事件绑定，不会删除dom节点
    vm.$destroy()
  })

  vm.$on('close', () => {
    console.log('close')
    vm.visible = false
  })
  return vm
}

export default notify
