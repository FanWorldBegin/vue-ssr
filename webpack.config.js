const path = require('path') // 使用绝对路径
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

// __dirname
const config = {
  target: 'web', // 编译目标
  entry: path.join(__dirname, 'client/entry.js'),

  output: {
    // 输出路径
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dists')
  },
  mode: 'development',
  module: {

    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // this will apply to both plain .js files
      // AND <script> blocks in vue files
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      // this will apply to both plain .css files
      // AND <style> blocks in vue files
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      // this will apply to both plain .scss files
      // AND <style lang="scss"> blocks in vue files
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader', // css 以一段代码js出现,写入html
          'css-loader', // 读出css 文件
          {
            loader: 'sass-loader',
            options: {
              // data: '$color: red;'
            }
          }
        ]
      },
      {
        test: /\.(gif|jpg|png|svg)$/,
        use: [
          {
            // 图片转换为base64 代码写入js
            loader: 'url-loader',
            options: {
              limit: 1024, // 小于1024
              name: '[name].[ext]' // ext 为文件扩展名
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    // 可以在页面中获取变量进行判断,js 中可以获取，区别打包
    // 要单引号在外面，获取到是字符串
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
  ]
}

if (isDev) {
  config.module.rules.push(
    {
      test: /\.styl(us)?$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            // stylus-loader 会生成sourceMap 直接使用他生成的，提高效率
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    })
  // 调试代码，可以在浏览器里面看到自己写的代码, 而不是打包后的
  config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
    port: 8001,
    host: '0.0.0.0', // 可以通过IP访问，其他设备也可以
    overlay: {
      errors: true // 显示错误
    },
    //    historyFallback: {
    //        //webpack-dev-server 中没有映射的地址映射到index.html
    //    },
    hot: true // 重新渲染当页面代码

    // open: true, // 自动打开浏览器

  }
  config.plugins.push(

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  // 生产环境

  config.plugins.push(
    new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }))
  // 正是环境下
  config.output.filename = '[name].[chunkhash:8].js'

  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it uses publicPath in webpackOptions.output
          // publicPath: '../',
          // hmr: process.env.NODE_ENV === 'development',
        }
      },
      // 'vue-style-loader', //style loader 在css外包js 这里不需要
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          // stylus-loader 会生成sourceMap 直接使用他生成的，提高效率
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })
}

module.exports = config
