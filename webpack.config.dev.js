const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index:  path.join(__dirname, './src/index.tsx')
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    publicPath: '/',
    // publicPath: "https://...cdnpath.../assets/" // CDN 资源 URL 前缀
  },
  devServer: {
    inline: true,
    port: 3333
  },
  resolve: {
    extensions: [".ts",".tsx",".js"]
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        // include: ['./src'],
        use: {
          loader: 'babel-loader',
          options: { // babel 转义的配置选项
            babelrc: false, // 不使用.babelrc文件
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              ['@babel/plugin-proposal-decorators', {legacy: true}],
              ['@babel/plugin-proposal-class-properties', {loose: true}],
            ],
            cacheDirectory: true,
          },
        },
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, `./src/html/index.html`), // 指定模板路径
      filename: 'index.html',
      inject: true,
      chunks: ['vendor', 'index'],
    })
  ]
}