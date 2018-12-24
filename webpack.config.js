const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 静态资源输出
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')

let publicPath = '/'
if (process.env.BUILD_ENV === 'VERSION') {
  publicPath = config.webpack.versionPrefix || '/'
} else if (process.env.BUILD_ENV === 'CDN') {
  publicPath = config.webpack.cdnPrefix || '/'
}

const entry = {}
const files = fs.readdirSync(path.join(__dirname, './src'))
files.forEach(file => {
  const stat = fs.lstatSync(path.join(__dirname, './src', file))
  if (stat.isFile()) {
    const fileArr = file.split('.')
    if (fileArr[1] === 'js') {
      entry[fileArr[0]] = path.join(__dirname, './src', file)
    }
  }
})

module.exports = {
  entry,
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].js',
    publicPath,
    // publicPath: "https://...cdnpath.../assets/" // CDN 资源 URL 前缀
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
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { // babel 转义的配置选项
            babelrc: false, // 不使用.babelrc文件
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              ['import', {libraryName: 'antd', libraryDirectory: 'es', style: 'less'}], // cdn 单独引用的情况需要注释掉这一行
              '@babel/plugin-syntax-dynamic-import',
              ['@babel/plugin-proposal-decorators', {legacy: true}],
              ['@babel/plugin-proposal-class-properties', {loose: true}],
            ],
            cacheDirectory: true,
          },
        },

      },
      {
        test: /(\.css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              // publicPath: '../'
            },
          },
          'css-loader',
        ],
      },
      {
        test: /(\.less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              // publicPath: '../'
              publicPath: '../',
            },
          },
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true, // 选择是ant的支持
            },
          },
        ],
      },
    ],
  },
  plugins: [ // 执行顺序是反着的
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './src/assets'),
      to: './assets',
      ignore: ['.*'],
    }]),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname), // 根目录
      // verbose Write logs to console.
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
    antd: 'antd',
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
