const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,//关闭eslint校验
//配置跨域
devServer:{
  proxy: {
    '/api': {
      target:'http://localhost:3000',
      changeOrigin:true,
      pathRewrite: {
        '^/api': ''
    }
  }
},
}})
