// 获取webpack 配置

// node 目前不支持import
const Router = require('koa-router')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')

const path = require('path')
const fs = require('fs')
// 服务端渲染
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')
// 1.nodejs里面编译webpack, 可以生成一个在服务端运行的bundle - serverCompiler，可以直接run

const serverCompiler = webpack(serverConfig)
// 2.指定输出方式。
// MemoryFS 不把文件写入磁盘，（不生成新文件） 存储在内存中，这样webpack读取会很快
const mfs = new MemoryFS()

serverCompiler.outputFileSystem = mfs // 指定输出目录在memoryFS里面

let bundle // 用来记录webpack打包文件

// 3. 在client目录下修改文件后，会重新执行打包
serverCompiler.watch({}, (err, states) => {
  if (err) throw err // 打包错误，抛出错误
  states = states.toJson()

  // 当不是打包错误（eslint）不会出现在err里面，会出现在states里
  states.errors.forEach(err => console.log(err))
  states.warnings.forEach(warn => console.warn(warn))
  // 以上为webpack相关配置
  // cconsole.log(serverConfig)
  // 获取输出路径
  const boundlePath = path.join(
    // 2.输出目录为webpack 中指定的 ../server-build
    serverConfig.output.path,
    // 使用插件生成的json
    'vue-ssr-server-bundle.json'
  )
  // 读出字符串而不是二进制utf-8
  bundle = JSON.parse(mfs.readFileSync(boundlePath, 'utf-8'))
  console.log('new bundle generated')
})

// koa 的中间件，处理服务端渲染返回的东西
const handleSSR = async (ctx) => {
  console.log('handleSSR')
  // 第一次打包bundle可能不存在
  if (bundle) {
    ctx.body = '等一会别着急......'
    return
  }

  const clientManifestResp = await axios.get(
    'http:127.0.0.1:8000/public/vue-ssr-cient-manifest.json'
  )

  const clientManifest = clientManifestResp.data
  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs')
  )
  // 1.传入bundle 会生成一个可以执行render 的function
  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: 'false', // 按照官方规定的模版可以直接注入（这里不要）
      clientManifest // 生成有js标签的字符串
    })

  await serverRender(ctx, renderer, template)
}

const router = new Router()

// 所有请求都通过 handleSSR处理
router.get('*', handleSSR)

module.exports = router
