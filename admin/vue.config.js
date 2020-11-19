module.exports = {
  devServer:{
    historyApiFallback:true
  },
  //dist包输出路径
  outputDir:__dirname+'/../server/admin',
  //把开发服务器架设在根路径
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/'
}