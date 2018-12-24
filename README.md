# react 由浅如深

- 最基本的开发使用（base）
- 基本使用再结合路由 （base_router）
- 增加异步组件使用  （base_router_async）
- 增加mobx数据存储   （base_router_async_mobx）
- 增加antd组件   （base_router_async_mobx_antd）

## 基本使用

- make package 来打包 version作为前缀
- make package-prd 来做CDN的打包处理
- npm run start 运行开发环境

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

### 安装React

```
npm install react react-dom --save-dev
```

### 安装babel 相关

[地址](https://www.npmjs.com/package/babel-loader)

`npm install -D babel-loader @babel/core @babel/preset-env webpack`

安装 babel

```
npm install  @babel/core @babel/preset-env --save-dev
```

安装 babel-react

```
npm install babel-loader @babel/preset-react --save-dev
```

在webpack的配置

```
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: [require('@babel/plugin-proposal-object-rest-spread')]
        }
      }
    }
  ]
}
```

### 使用 html-webpack-plugin 和 webpack-dev-server 开启开发模式

```
npm i webpack-dev-server --save-dev
npm i html-webpack-plugin html-loader --save-dev
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

*支持热更新*


```
// webpack.config.dev.js config 部分

const webpack = require('webpack')


devServer: {
...
+ hot: true,
...
},


plugins: [
+ new webpack.HotModuleReplacementPlugin(),
...
]
```

### webpack 的配置

index.js

```js 
import React from "react";
import {render} from "react-dom";
const App = () => {
  return (
    <div>
      Hello React and Webpack 很好
    </div>
    );
};
render(<App/>, document.getElementById("root"));
```

```js
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
```


## 使用react-router

```
npm install react-router-dom --save-dev
```

当exact为true时只有path等于location.pathname时才会匹配成功。

### 支持css

通常情况下,webpack只对js文件提供支持,但是比如说less/sass/css/ES7等就不认识了,这时候就需要使用loaders来帮助它转化了

```
npm install css-loader --save-dev
npm install --save-dev mini-css-extract-plugin
```

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          "css-loader"
        ]
      }
    ]
  }
}
```

### 提取出css样式

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

## 使用异步组件 asyncComponent

```
npm install @babel/plugin-syntax-dynamic-import --save-dev
npm install --save-dev @babel/polyfill --save-dev

```
webpack
```
   use: {
          loader: 'babel-loader',
          options: { // babel 转义的配置选项
            babelrc: false, // 不使用.babelrc文件
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins:[
              '@babel/plugin-syntax-dynamic-import',
            ],
            cacheDirectory: true
          },
        },
```
使用

AsyncComponent

```js
import React, { Component } from 'react'

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props)

      this.state = {
        component: null
      }
    }
    async componentDidMount() {
      const { default: component } = await importComponent()

      this.setState({
        component: component
      })
    }
    render() {
      const C = this.state.component

      return C ? <C {...this.props} /> : null
    }
  }
  return AsyncComponent
}
```
index.js
```js
import "@babel/polyfill";

import asyncComponent from './common/AsyncComponent';
const Home = asyncComponent(() => import("./page-home/home"));

```

## 使用mobx 来做数据管理

```
npm install mobx --save-dev
npm install mobx-react --save-dev

```
装饰者和class

```
npm install @babel/plugin-proposal-class-properties --save-dev
npm install @babel/plugin-proposal-class-properties --save-dev

```
```
plugins:[
  '@babel/plugin-syntax-dynamic-import',
  ['@babel/plugin-proposal-decorators',{"legacy": true}],
  ['@babel/plugin-proposal-class-properties', {loose: true}]
],        
```
```
import {Provider} from 'mobx-react'
import * as stores from './store'
  <Provider store = {stores}>
    <App />
  </Provider>,
```
```

@inject("store")
@observer
class Home extends Component {
  render() {
    return (
      <div className="home">
        <h2>Home{this.props.store.baseStore.text}</h2>
      </div>
    )
  }
}
export default Home;
```

## 增加antd组件 

```
npm install antd --save-dev

import 'antd/dist/antd.less';  // or 'antd/dist/antd.css'

### 按需加载
1
{
  "plugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
  ]
}

# 2 手动引入
import DatePicker from 'antd/lib/date-picker';  // 加载 JS
import 'antd/lib/date-picker/style/css';        // 加载 CSS
// import 'antd/lib/date-picker/style';         // 加载 LESS


本地化：
import {LocaleProvider} from 'antd' // 这个是ant的语言
import zh_CN from 'antd/lib/locale-provider/zh_CN'


  <LocaleProvider locale={zh_CN}>
    <Provider store = {stores}>
      <App />
    </Provider>
  </LocaleProvider>



```

按需加载

```
npm install babel-plugin-import --save-dev

// .babelrc or babel-loader option
{
  "plugins": [
     ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "less" }], // `style: true` 会加载 less 文件
  ]
}

```

### 支持less的转换

```
npm install --save-dev less-loader less

{
        test: /(\.css|\.less)$/,
        use: [
          ...
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true // 选择是ant的支持
            }
          }
        ]
      }

```


### 支持 eslintrc

```
npm i  eslint --save-dev
// 关于 eslint --init 可以不必执行，它主要的作用是在你当前文件夹下生成.eslintrc文件
// 所谓扩展配置就是使用别人配置好的配置，我们选用 Airbnb 标准 它主要提供3种预安装包：Google标准、Airbnb标准和Standard标准。
npm i eslint-config-airbnb --save-dev

// a11y是accessibility（无障碍环境）的缩写，从第一个字母a到最后一个字母y，中间一共是11个字母，所以就叫a11y了，类似于i18n表示internationalization（国际化）一样。JSX主要是React会用到，虽然我们的项目里可能并不会用React，但是这个Airbnb标准必须要用到它，所以必须安装。
npm i eslint-plugin-jsx-a11y --save-dev

同上，Airbnb标准必需。是用来校验 import 的，比如不能加 .js 后缀
npm i eslint-plugin-import --save-dev

React支持
前文说到 eslint 是一个完全插件化的东西，所以支持特定语言也很简单。，比如我们需要支持 react，那么我们直接安装 react 插件即可
npm i eslint-plugin-react --save-dev

如果不配置这个插件的话，会报 Parsing error: Unexpected token =。所以我们下载 npm i -g babel-eslint之后还需要在配置文件中加入 "parser": "babel-eslint"(配置方法见下文)

npm i babel-eslint --save-dev

运行 
./node_modules/.bin/eslint .

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
