const path = require('path') // 使用绝对路径
const vueLoaderOptions = require('./vue-loader.config')
const isDev = process.env.NODE_ENV === 'development'
// __dirname
const config = {
  mode: process.env.NODE_ENV || 'production', // development || production
  target: 'web', // 编译目标
  entry: path.join(__dirname, '../client/client-entry.js'),

  output: {
    // 输出路径
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../public'),
    publicPath: 'http://127.0.0.1:8001/public/'
  },
  module: {

    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre' // 在使用真正的loader 处理之前先检测一下，预处理
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderOptions(isDev)
      },
      // this will apply to both plain .js files
      // AND <script> blocks in vue files
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules' // 不需要编译的，发布时候已经编译过了
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
              name: 'resourses/[path][name]-[hash:8].[ext]'
              // path, hash ,ext 都是变量ext 为文件扩展名，
              // 最后生成会覆盖变量,[hash:8] 会小一些
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
