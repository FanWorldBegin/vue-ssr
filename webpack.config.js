const path = require('path'); // 使用绝对路径
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development'

//__dirname
const config = {
    target: 'web', //编译目标
    entry: path.join(__dirname, 'src/entry.js' ),

    output: {
        //输出路径
        filename: 'bundle.js',
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
              'css-loader',  //读出css 文件
              {
                loader: 'sass-loader',
                options: {
                  //data: '$color: red;'
                }
              }
            ]
          },
          {
            test: /\.styl$/,
            use: [
                'vue-style-loader',
                'css-loader',
                'stylus-loader'
            ]
          },
          {
              test: /\.(gif|jpg|png|svg)$/,
              use: [
                  {
                      //图片转换为base64 代码写入js
                      loader: 'url-loader',
                      options: {
                        limit: 1024, // 小于1024
                        name: '[name].[ext]', //ext 为文件扩展名
                      }
                  }
              ]
          }
        ]
    },
    plugins: [
        // make sure to include the plugin for the magic
        //可以在页面中获取变量进行判断,js 中可以获取，区别打包
        // 要单引号在外面，获取到是字符串
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ?  '"development"' : '"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin()
      ]
}

if(isDev) {
    //调试代码，可以在浏览器里面看到自己写的代码, 而不是打包后的
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
       port: 8000,
       host: '0.0.0.0', //可以通过IP访问，其他设备也可以
       overlay: {
           errors: true, // 显示错误
       },
    //    historyFallback: {
    //        //webpack-dev-server 中没有映射的地址映射到index.html
    //    },
       hot: true, //重新渲染当页面代码

       //open: true, // 自动打开浏览器


    }
    config.plugins.push(

        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

}

module.exports = config