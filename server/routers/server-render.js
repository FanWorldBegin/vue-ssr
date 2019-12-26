// 服务端渲染操作
const ejs = require('ejs')
module.exports = async (ctx, renderer, template) => {
  // 设置请求头
  ctx.headers['Content-Type'] = 'text/html'

  // 传入 vue-server-render来渲染html
  // 包括客户端js路径，css路径，vue当前路由样式内容
  const context = { url: ctx.path }

  try {
    const appString = await renderer.renderToString(context) // 这个方法返回promise
    // 渲染html
    const html = ejs.render(template, {
      // 渲染template 需要的变量
      appString,
      // 拿到带有标签的整个字符串
      style: context.renderStyles(),
      scripts: context.renderScripts()
    })

    ctx.body = html // 返回html
  } catch (err) {
    // 打印错误
    console.log('render err', err)
    throw err
  }
}
