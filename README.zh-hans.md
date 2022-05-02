# postcss-rpx-plugin

[![Version npm](https://img.shields.io/npm/v/postcss-rpx-plugin.svg)](https://www.npmjs.com/package/postcss-rpx-plugin) [![GitHub package.json version](https://img.shields.io/github/package-json/v/jawa0919/postcss-rpx-plugin)](https://github.com/jawa0919/postcss-rpx-plugin) [![GitHub](https://img.shields.io/github/license/jawa0919/postcss-rpx-plugin)](https://github.com/jawa0919/postcss-rpx-plugin)

一款基于[`postcss`](https://github.com/postcss/postcss)的插件，用于将 css 中的 rpx 单位换算成 vw 单位。适用于移动端中宽度固定，高度不确定的设计稿。也可自行设置宽度和匹配单位。

```css
/* before */
.rule {
  margin: 10rpx 375rpx 0rpx 10px;
  height: 375rpx;
  background: url(icon-16rpx.jpg);
}

/* after */
.rule {
  margin: 1.33333vw 50vw 0 10px;
  height: 50vw;
  background: url(icon-16rpx.jpg);
}
```

## 使用

首先安装[`postcss-loader`](https://www.npmjs.com/package/postcss-loader) 和 [`postcss`](https://www.npmjs.com/package/postcss)。已集成 css-loader 的 cli 可跳过本步骤

```bash
npm i postcss postcss-loader -D
```

安装插件

```bash
npm i postcss-rpx-plugin -D
```

postcss@7 postcss@6 postcss@5 的版本请使用

```bash
# postcss@7 postcss@6 postcss@5
npm i postcss-rpx-plugin@1.0.3 -D
```

## 配置

在根目录下`postcss.config.js`配置

```js
module.exports = {
  plugins: [
    // register
    require("postcss-rpx-plugin"),
  ],
};
```

自定义写法

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

也可在`package.json`配置插件

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

## 参数

```js
const unit = options?.unit || "rpx"; // unit
const width = options?.width || 750; // ui design width
const precision = options?.precision || 5; // decimal places
const outUnit = options?.outUnit || "vw"; //  out unit
const exclude = options?.exclude || ""; // exclude some file,support regex
```

## 更新

### V2.0.1

- 修改说明文件

- 添加一个测试用例

  ```js
  it("should exclude file", () => {
    const rules = ".rule { margin: 10rpx 375rpx 0rpx 10px; }";
    const expected = ".rule { margin: 10rpx 375rpx 0rpx 10px; }";
    const from = "c:/a/b/c/d.css";
    const pc = postcss(rpx2vm({ exclude: ".css" }));
    const processed = pc.process(rules, { from }).css;
    expect(processed).toBe(expected);
  });
  ```

### V2.0.0

- 支持 postcss8 版本

### V1.0.3

- 修复 构建 `options?.unit` 保存
- 修复 `@type` ?

### V1.0.2

- 添加 @type

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
    const rules = ".rule { background: url(icon-16rpx.jpg); }";
    const expected = ".rule { background: url(icon-16rpx.jpg); }";
    const processed = postcss(rpx2vm()).process(rules).css;
    expect(processed).toBe(expected);
  });
  ```

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

## 感谢

[postcss-rpxtopx](https://github.com/yangmingshan/postcss-rpxtopx)

[postcss-rpx-loader](https://github.com/vlev1n/postcss-rpx-loader)

## 其他

[![GitHub](https://img.shields.io/badge/github-jawa0919-brightgreen.svg)](https://github.com/jawa0919)

欢迎大家提出想法和反馈问题 [issues](https://github.com/jawa0919/postcss-rpx-plugin/issues)
