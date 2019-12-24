const Koa = require('koa')

const app = new Koa()

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
