# postcss-rpx-plugin

[`postcss`](https://github.com/postcss/postcss) 插件，用于将 css 中的 rpx 单位换算成 vw 单位

## 特点

[`更新`](#更新)

## 使用

首先安装[`postcss-loader`](https://www.npmjs.com/package/postcss-loader) 和 [`postcss`](https://www.npmjs.com/package/postcss)。一些集成 css-loader 的 cli 可跳过

```
npm i postcss postcss-loader -D
```

安装本插件，执行`npm i postcss-rpx-plugin -D`引入

```
npm i postcss-rpx-plugin -D
```

配置在`package.json`配置插件

```json
{
  "dependencies": {},
  "devDependencies": {},
  "postcss": {
    "plugins": {
      "postcss-rpx-plugin": {
        "unit": "rpx",
        "width": 750,
        "precision": 5,
        "outUnit": "vw",
        "exclude": ""
      }
    }
  }
}
```

## 其他参考配置

`webpack.config.js`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
};
```

`postcss.config.js`

```js
module.exports = {
  syntax: "postcss-scss",
  plugins: [
    // 注册
    require("postcss-rpx-plugin"),
  ],
};
```

或者

```js
module.exports = {
  plugins: [
    [
      "postcss-rpx-plugin",
      {
        unit: "rpx",
        width: 750,
        precision: 5,
        outUnit: "vw",
        exclude: "",
      },
    ],
  ],
};
```

## 参数

```js
const unit = options?.unit || "rpx"; // 自定义的单位
const width = options?.width || 750; // ui图宽度
const precision = options?.precision || 5; // 配置精确度
const outUnit = options?.outUnit || "vw"; // 输入单位，// TODO 其他单位
const exclude = options?.exclude || ""; // 配置忽略文件，正则匹配
```

## 更新

### V1.0.0

- 整数 rpx
  ```js
  it("should replace the rpx unit with vw", () => {
    const rules = ".rule { margin: 10rpx 375rpx 0rpx 10px; }";
    const expected = ".rule { margin: 1.33333vw 50vw 0 10px; }";
    const processed = postcss(rpx()).process(rules).css;
    expect(processed).toBe(expected);
  });
  ```

### V1.0.1

- 小数 rpx
  ```js
  it("should replace the rpx unit with vw - Float", () => {
    const rules = ".rule { height: 375.0rpx; }";
    const expected = ".rule { height: 50vw; }";
    const processed = postcss(rpx2vm()).process(rules).css;
    expect(processed).toBe(expected);
  });
  ```
- url 忽略
  ```js
  it("should not replace values in `url()`", () => {
    const rules = ".rule { background: url(16rpx.jpg); }";
    const expected = ".rule { background: url(16rpx.jpg); }";
    const processed = postcss(rpx2vm()).process(rules).css;
    expect(processed).toBe(expected);
  });
  ```

## 感谢

[postcss-rpxtopx](https://github.com/yangmingshan/postcss-rpxtopx)

[postcss-rpx-loader](https://github.com/vlev1n/postcss-rpx-loader)
