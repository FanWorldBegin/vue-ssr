//后处理css, 优化变异后的css代码， 
//autoprefixer 给属性加上浏览器前缀
const autoprefixer = require('autoprefixer')
module.exports = {
    plugins: [
        autoprefixer()
    ]
}