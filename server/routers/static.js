const Router = require('koa-router')
const send = require('koa-send')

// 这个router 只能处理 /public 路径
const staticRouter = new Router({ prefix: '/public' })

// 请求路径为 /public
staticRouter.get('/*', async ctx => {
  await send(ctx, ctx.path)
})

module.exports = staticRouter
