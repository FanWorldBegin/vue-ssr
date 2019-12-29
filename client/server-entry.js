import createApp from './create-app'

// context 为 serve-render.js 中的 renderer.renderToString中的传入的 context
// 在这里接收
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp()
    // router.push 给路由添加对象，主动匹配路由调用组件,根据Url匹配组件
    router.push(context.url)

    // 路由中所有异步操作做完后做这个回调
    router.onReady(() => {
      // 在服务端渲染时候，亚要做异步请求，需要匹配组件,根据url匹配组件
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('no component Matched'))
      }

      resolve(app)
    })
  })
}
