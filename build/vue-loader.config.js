
module.exports = (isDev) => {
  return {
    // 忽略不小心设置的空格
    preserveWhitepace: true,
    // 默认不把vue样式打包进css文件，可以不加
    //   extractCSS: !isDev,
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    }
    // hotReload: false, // 根据环境变量生成
  }
}
