// server 打包配置，在 node端跑就行，不用考虑压缩，不用区分开发环境，正式环境。

const path = require('path') // 使用绝对路径
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const merge = require('webpack-merge') // 合c并不同文件的配置
const baseConfig = require('./webpack.config.base')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
// const isDev = process.env.NODE_ENV === 'development'

// 根据配置项合理合并
const config = merge(baseConfig, {
  entry: path.join(__dirname, '../client/server-entry.js'), // 1.入口
  target: 'node', // ++ 2. 定义打包出来node运行环境
  // 调试代码，可以在浏览器里面看到自己写的代码, 而不是打包后的
  devtool: 'source-map', // ++3. 可以调试代码
  output: {
    libraryTarget: 'commonjs2', // 4. 在服务度端运行，指定代码export出去入口怎样
    // nodejs 是module.exports =  引用出去nodejs可以直接引用
    filename: 'server-entry.js', // 5. 指定名字，不需要哈希模块加载
    path: path.join(__dirname, '../server-build'), // 6.制定输出路径
    externals: Object.keys(require('../package.json').dependencies)
    // 7.由于程序跑在node端，不需要把vue代码打包到输出文件中，只需要require就可以 (npm i vue -S)
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
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
  resolve: {
    // import Vue from 'vue' 可以指定vue 位置
    // 默认引入的是vue.runtime.xxx， 不能使用 new Vue({template})
    alias: {
      vue: path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    // make sure to include the plugin for the magic
    // 可以在页面中获取变量进行判断,js 中可以获取，区别打包
    // 要单引号在外面，获取到是字符串
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': "'server"
    }),
    new VueServerPlugin() // 打包会生成一个json文件
  ]
})

module.exports = config
