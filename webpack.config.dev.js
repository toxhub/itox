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
    contentBase: path.join(__dirname, "./src/"), 
    inline: true,
    port: 3333,
    publicPath: '/',
    historyApiFallback: true, //不跳转
    host: '127.0.0.1',
    hot: true,
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
              ['import', {libraryName: 'antd', libraryDirectory: 'es', style: 'less'}],
              '@babel/plugin-syntax-dynamic-import',
              ['@babel/plugin-proposal-decorators', {legacy: true}],
              ['@babel/plugin-proposal-class-properties', {loose: true}],
            ],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        include: [/src/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              //modules: true, // 启用/禁用 CSS 模块和设置模式 启用的话样式会hash
            },
          },
          'less-loader'
        ],
      },
      {
          test: /\.less$/,
          exclude: [/src/],
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                  importLoaders: 1 // 在 css-loader 前应用的 loader 的数量
              },
            },
            {
              loader: 'less-loader', // compiles Less to CSS
              options: {
                javascriptEnabled: true // 选择是ant的支持
              }
            },
          ],
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