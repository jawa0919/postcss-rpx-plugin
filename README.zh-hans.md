# postcss-rpx-plugin

[`postcss`](https://github.com/postcss/postcss) 的插件，用于将 css 中的 rpx 单位换算成 vw 单位

## 使用

首先安装了[`postcss-loader`](https://www.npmjs.com/package/postcss-loader)

执行`npm i postcss-rpx-plugin -D`以安装本插件

```
npm i postcss-rpx-plugin -D
```

## 默认参数

```js
var unit = options?.unit || "rpx"; // 自定义的单位
var width = options?.width || 750; // ui图宽度
var precision = options?.precision || 5; // 配置精确度
var outUnit = options?.outUnit || "vw"; // 输入单位
var exclude = options?.exclude || ""; // 配置忽略文件，正则匹配
var mediaQuery = options?.mediaQuery || true; // 媒体
```

### webpack

根目录`webpack.config.js`中, 声明`postcss-loader`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["postcss-loader"],
      },
    ],
  },
};
```

根目录`postcss.config.js`，注册

```js
module.exports = {
  plugins: [
    // 注册
    require("postcss-rpx-plugin"),
  ],
};
```

### 其他

也可在根目录`package.json`中配置

```json
{
  "postcss": {
    "plugins": {
      "postcss-rpx-plugin": {
        "unit": "rpx",
        "width": 750,
        "precision": 5,
        "outUnit": "vw",
        "outUnit": "",
        "mediaQuery": true
      }
    }
  }
}
```
