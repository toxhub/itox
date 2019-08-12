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

