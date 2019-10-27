const path = require('path') // 使用绝对路径
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')

const merge = require('webpack-merge') // 合c并不同文件的配置
const baseConfig = require('./webpack.config.base')
// const isDev = process.env.NODE_ENV === 'development'
// 在client中使用
const defaultPluins = [
  // make sure to include the plugin for the magic
  // 可以在页面中获取变量进行判断,js 中可以获取，区别打包
  // 要单引号在外面，获取到是字符串
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new VueLoaderPlugin(),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })

]

const devServer = {
  port: 8002,
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

// 根据配置项合理合并
const config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  // 调试代码，可以在浏览器里面看到自己写的代码, 而不是打包后的
  // devtool: '#cheap-module-eval-source-map', --默认有
  module: {
    rules: [
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
      }
    ]
  },
  devServer,
  resolve: {
    // import Vue from 'vue' 可以指定vue 位置
    // 默认引入的是vue.runtime.xxx， 不能使用 new Vue({template})
    alias: {
      vue: path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPluins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})

module.exports = config
