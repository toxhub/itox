const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const pkg = require('./package')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// 静态资源输出
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')

let publicPath = '/'

if (process.env.BUILD_ENV === 'VERSION') {
  publicPath = config.versionPrefix || '/'
} else if (process.env.BUILD_ENV === 'CDN') {
  publicPath = config.cdnPrefix || '/'
}

const entry = {}
const files = fs.readdirSync(path.join(__dirname, './src'))
files.forEach(file => {
  const stat = fs.lstatSync(path.join(__dirname, './src', file))
  if (stat.isFile()) {
    const fileArr = file.split('.')
    if (fileArr[1] === 'tsx') {
      entry[fileArr[0]] = path.join(__dirname, './src', file)
    }
  }
})

module.exports = {
  entry: {
    index:  path.join(__dirname, './src/index.tsx')
  },
  output: {
    path: `${__dirname}/dist/${pkg.version}`,
    filename: '[name].js',
    publicPath,
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
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    splitChunks: {
      // 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
      chunks: 'all',
      // 表示在压缩前的最小模块大小，默认为0；
      minSize: 30000,
      // 表示被引用次数，默认为1
      minChunks: 1,
      // 最大的按需(异步)加载次数，默认为1；
      maxAsyncRequests: 3,
      // 最大的初始化加载次数，默认为1；
      maxInitialRequests: 3,
      // 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；设置ture则使用默认值
      name: true,
      // 缓存组，目前在项目中设置cacheGroup可以抽取公共模块，不设置则不会抽取
      cacheGroups: {
        // 缓存组信息，名称可以自己定义
        commons: {
          // 拆分出来块的名字,默认是缓存组名称+"~" + [name].js
          // name: "test",
          // 同上
          chunks: 'all',
          // 同上
          minChunks: 3,
          // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
          enforce: true,
          // test: 缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；
          test: '',
        },
        // 设置多个缓存规则
        vendor: {
          test: /node_modules/,
          chunks: 'all',
          name: 'vendor',
          // 表示缓存的优先级
          priority: 10,
          enforce: true,
        },
      },
    },
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
              ['import', {libraryName: 'antd', style: 'less'}],
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
          {
            // MiniCssExtractPlugin 不支持热更新
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              // publicPath: '../'
            },
          },
          "css-loader"
        ]
      },
      {
        test: /\.styl$/,
        use: [
          {
            // MiniCssExtractPlugin 不支持热更新
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              // publicPath: '../'
            },
          },
          'css-loader',
          'stylus-loader',
        ],
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        include: [/src/],
        use: [
          {
            // MiniCssExtractPlugin 不支持热更新
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              // publicPath: '../'
            },
          },
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
            {
              // MiniCssExtractPlugin 不支持热更新
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                // publicPath: '../'
              },
            },
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
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        include: [path.resolve(__dirname, './src/assets')],
        use: [{
          loader: 'url-loader',
          query: {
            name: '[name].[hash:8].[ext]',
            limit: 1024 * 10,
          },
        }],
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, './src/icon'),
        ],
        use: [
          {loader: 'svg-sprite-loader'},
        ],
      },
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './src/assets'),
      to: './assets',
      ignore: ['.*'],
    }]),
    new CleanWebpackPlugin({
    
      verbose: true, // 开启在控制台输出信息
      // dry Use boolean "true" to test/emulate delete. (will not remove files).
      // Default: false - remove files
      dry: false,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  externals: {
  },
}

Object.keys(entry).forEach(fileIndex => {
  module.exports.plugins.push(new HtmlWebpackPlugin({
    template: path.join(__dirname, `./src/html/${fileIndex}.html`), // 指定模板路径
    filename: `${fileIndex}.html`,
    inject: true,
    chunks: ['vendor', fileIndex],
  }))
})
