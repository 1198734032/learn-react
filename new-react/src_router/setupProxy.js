const proxy = require('http-proxy-middleware')//已存在

module.exports = function (app) {
    app.use(proxy('/api1', {  //遇见/api1前缀的请求就会触发该代理配置
        target: 'http://localhost:5000', //请求转发给谁
        changeOrigin: true, //控制服务器收到的请求头中host字段的值
        pathRewrite: { '^/api1': '' } //重写请求路径 /api1/xxx ==>/xxx
    }))
}