const Koa = require('koa')
const send = require('koa-send')
const app = new Koa()
const path = require('path')

const staticRouter = require('./routers/static')
// 区分开发环境和生产环境
const isDev = process.env.NODE_ENV === 'development'

// 中间件 记录请求和错误信息
app.use(async (context, next) => {
  try {
    console.log(`request with the path ${context.path}`)
    await next()
  } catch (err) {
    console.log(err)
    context.state = 500
    if (isDev) {
      context.body = err.message
    } else {
      // 生产环境
      context.body = 'please try later'
    }
  }
})

app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
let pageRouter
if (isDev) {
  pageRouter = require('./routers/dev-ssr')
} else {
  pageRouter = require('./routers/ssr')
}
app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    // 上层目录的文件 异步请求
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3333

app.listen(PORT, HOST, () => {
  console.log(`server is listening on ${HOST}:${PORT}`)
})
