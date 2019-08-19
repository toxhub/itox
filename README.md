
开发： `npm run dev`

### 初始化，生成package.json和tsconfig.json

```
npm init -y && tsc --init
```

### 安装webpack

```
npm i webpack webpack-cli --save-dev
```
新建webpack.config.dev.js配置script

```
"scripts": {
    "start": "webpack-dev-server --config './webpack.config.dev.js' --open --mode development",
    "build": "webpack --mode production --progress"
  }
```

### 安装React和TypeScript

```
npm install -D react react-dom 
npm install -D typescript @types/react @types/react-dom
```

### 安装babel 相关

[地址](https://www.npmjs.com/package/babel-loader)


安装 babel

```
npm install -D  @babel/core @babel/preset-env 
```

安装 babel-react

```
npm install -D babel-loader @babel/preset-react --save-dev
```

用异步组件 asyncComponent

```
npm install  -D  @babel/plugin-syntax-dynamic-import 
npm install  -D  @babel/polyfill

```

装饰者和class

```
npm install -D @babel/plugin-proposal-class-properties 
npm install -D  @babel/plugin-proposal-decorators

```

typescript支持

```
npm install -D @babel/preset-typescript
```

配置说明
```
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
  }
```

### 使用 html-webpack-plugin 和 webpack-dev-server 开启开发模式
```
npm i -D webpack-dev-server
npm i -D html-webpack-plugin html-loader
```

```webpack.dev

const HtmlWebpackPlugin = require('html-webpack-plugin');
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/html/index.html', //指定模板路径
      filename: "index.html"
    })
  ]

```

### 支持css

通常情况下,webpack只对js文件提供支持,但是比如说less/sass/css/ES7等就不认识了,这时候就需要使用loaders来帮助它转化了

```
npm i -D css-loader
```

```
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "css-loader"
        ]
      }
    ]
  }
  ```

### 支持less的转换
  ```
  npm install -D less-loader less
  ```

  ```
      {
        test: /\.css$/,
        use: [
          "css-loader"
        ]
      },
      {
        test:  /\.less$/,
        use: [
          'css-loader',
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true // 选择是ant的支持
            }
          }
        ]
      }
```

### 使用style-loader
style-loader通过插入<style>标记将CSS添加到DOM中。
建议将 style-loader 与 css-loader 结合使用

```
npm install style-loader --save-dev
```

### 增加antd组件 

```
npm i --save antd 
```

```
import { DatePicker } from 'antd';
ReactDOM.render(<DatePicker />, mountNode);
```

引入样式

```
import 'antd/dist/antd.less'; // or 'antd/dist/antd.css'
```

webpack配置
使用 babel-plugin-import（推荐）。

```
// .babelrc or babel-loader option
{
  "plugins": [
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": "less" // `style: true` 会加载 less 文件
    }]
  ]
}
```

```
      {
        test: /\.less$/,
        include: [/src/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
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
                  importLoaders: 1
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
```

### react-router-dom

```
npm i -S react-router-dom  @types/react-router-dom
```

### 使用mobx来做数据管理

```
npm i -S mobx mobx-react 
```

###支持 stylus

```
npm i -S stylus stylus-loader
```

```
      {
        test: /\.styl$/,
        use: [
          'css-loader',
          'stylus-loader',
        ],
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/,
      },
```

### 使用MiniCssExtractPlugin 插件提取css到一个文件

```
npm i -D mini-css-extract-plugin
```



### 静态文件的处理

清除dist目录文件 ，拷贝asset文件到dist目录下

```
npm i clean-webpack-plugin copy-webpack-plugin --save-dev
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
  ]



```


### 提取出css样式并压缩

之前直接使用 minimize: true 在匹配到css后直接压缩

遇到的问题：
项目是用了autoprefix自动添加前缀，这样压缩，会导致添加的前缀丢失

解决：使用插件 optimize-css-assets-webpack-plugin

new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.css\.*(?!.*map)/g,  //注意不要写成 /\.css$/g
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
        discardComments: { removeAll: true },
        // 避免 cssnano 重新计算 z-index
        safe: true,
        // cssnano 集成了autoprefixer的功能
        // 会使用到autoprefixer进行无关前缀的清理
        // 关闭autoprefixer功能
        // 使用postcss的autoprefixer功能
        autoprefixer: false
    },
    canPrint: true
}),
```
npm install uglifyjs-webpack-plugin --save-dev
npm install  optimize-css-assets-webpack-plugin --save-dev
```
```js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  }
}
```


### cross-env 支持多环境变量

