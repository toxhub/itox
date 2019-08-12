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