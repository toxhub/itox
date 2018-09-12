# react 由浅如深

- 最基本的开发使用（base）
- 基本使用再结合路由 （base_router）
- 增加异步组件使用  （base_router_async）
- 增加mobx数据存储   （base_router_async_mobx）
- 增加antd组件   （base_router_async_mobx_antd）

## 基本使用

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


