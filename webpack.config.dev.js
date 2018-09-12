const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "./src/"), // 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录)
    publicPath: '/',
    historyApiFallback: true, //不跳转
    inline: true,
    host: '127.0.0.1',
    hot: true,
    port: 8080,
    stats: {
      colors: true,
    },
    proxy: {
      '/api/*': {
        target: 'http://localhost:4000',
        changeOrigin: true, // 支持跨域请求
        secure: true // 支持 https
      }
    }
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { // babel 转义的配置选项
            babelrc: false, // 不使用.babelrc文件
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            cacheDirectory: true
          },
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/html/index.html', //指定模板路径
      filename: "index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};