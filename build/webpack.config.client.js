const path = require('path') // 使用绝对路径
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const merge = require('webpack-merge') // 合c并不同文件的配置
const baseConfig = require('./webpack.config.base')
const isDev = process.env.NODE_ENV === 'development'
// 在client中使用
const defaultPluins = [
  // make sure to include the plugin for the magic
  // 可以在页面中获取变量进行判断,js 中可以获取，区别打包
  // 要单引号在外面，获取到是字符串
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new VueLoaderPlugin(),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]
let config

const devServer = {
  port: 8001,
  host: '0.0.0.0', // 可以通过IP访问，其他设备也可以
  overlay: {
    errors: true // 显示错误
  },
  //    historyFallback: {
  //        //webpack-dev-server 中没有映射的地址映射到index.html
  //    },
  hot: true, // 重新渲染当页面代码
  historyApiFallback: {
    index: '/public/index.html' // 设置为根目录下的index.html
    // htmlPlugin 生成的html的位置，注意这个路径和public路经有关

  }
  // open: true, // 自动打开浏览器
}

// 判断如何使用 webpack
if (isDev) {
  // 根据配置项合理合并
  config = merge(baseConfig, {
    // 调试代码，可以在浏览器里面看到自己写的代码, 而不是打包后的
    devtool: '#cheap-module-eval-source-map',
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
    plugins: defaultPluins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  // 正是环境下
  config = merge(baseConfig, {
    entry: path.join(__dirname, '../client/entry.js'),
    plugins: defaultPluins.concat([
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: '[name].css',
        chunkFilename: '[id].css',
        ignoreOrder: false // Enable to remove warnings about conflicting order
      })
    ]),
    // 打包
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },

    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
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
        }
      ]
    }

  })
}

module.exports = config
