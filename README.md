# postcss-rpx-plugin

[![Version npm](https://img.shields.io/npm/v/postcss-rpx-plugin.svg)](https://www.npmjs.com/package/postcss-rpx-plugin) [![GitHub package.json version](https://img.shields.io/github/package-json/v/jawa0919/postcss-rpx-plugin)](https://github.com/jawa0919/postcss-rpx-plugin) [![GitHub](https://img.shields.io/github/license/jawa0919/postcss-rpx-plugin)](https://github.com/jawa0919/postcss-rpx-plugin)

[中文 README](https://github.com/jawa0919/postcss-rpx-plugin/blob/master/README.zh-hans.md)

Based on [`postcss`](https://github.com/postcss/postcss) A plug-in for converting rpx units in CSS into VW units. It is applicable to the design draft with fixed width and uncertain height in the mobile end. You can also set the width and matching unit by yourself.

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

## Usage

First install [`postcss-loader`](https://www.npmjs.com/package/postcss-loader) And [`postcss`](https://www.npmjs.com/package/postcss)。 CLI with CSS loader integrated can skip this step

```bash
npm i postcss postcss-loader -D
```

Install the plug-in

```bash
npm i postcss-rpx-plugin -D
```

Please use the version of postcss@7 postcss@6 postcss@5

```bash
# postcss@7 postcss@6 postcss@5
npm i postcss-rpx-plugin@1.0.3 -D
```

## configure

in `postcss.config.js`

```js
module.exports = {
  plugins: [
    // register
    require("postcss-rpx-plugin"),
  ],
};
```

custom configure `postcss.config.js`

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

or in `package.json`

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

## Options

```js
const unit = options?.unit || "rpx"; // unit
const width = options?.width || 750; // ui design width
const precision = options?.precision || 5; // decimal places
const outUnit = options?.outUnit || "vw"; //  out unit
const exclude = options?.exclude || ""; // exclude some file,support regex
```

## CHANGELOG

### V2.0.1

- fix readme
- add test
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

- support postcss@8

### V1.0.3

- fix build `options?.unit` error
- fix `@type` ?

### V1.0.2

- add @type

### V1.0.1

- Float rpx

  ```js
  it("should replace the rpx unit with vw - Float", () => {
    const rules = ".rule { height: 375.0rpx; }";
    const expected = ".rule { height: 50vw; }";
    const processed = postcss(rpx2vm()).process(rules).css;
    expect(processed).toBe(expected);
  });
  ```

- url ignore

  ```js
  it("should not replace values in `url()`", () => {
    const rules = ".rule { background: url(icon-16rpx.jpg); }";
    const expected = ".rule { background: url(icon-16rpx.jpg); }";
    const processed = postcss(rpx2vm()).process(rules).css;
    expect(processed).toBe(expected);
  });
  ```

### V1.0.0

- Int rpx
  ```js
  it("should replace the rpx unit with vw - Int", () => {
    const rules = ".rule { margin: 10rpx 375rpx 0rpx 10px; }";
    const expected = ".rule { margin: 1.33333vw 50vw 0 10px; }";
    const processed = postcss(rpx2vm()).process(rules).css;
    expect(processed).toBe(expected);
  });
  ```

## Thanks

[postcss-rpxtopx](https://github.com/yangmingshan/postcss-rpxtopx)

[postcss-rpx-loader](https://github.com/vlev1n/postcss-rpx-loader)

## Other

[![GitHub](https://img.shields.io/badge/github-jawa0919-brightgreen.svg)](https://github.com/jawa0919)

You are welcome to put forward your ideas and feedback [issues](https://github.com/jawa0919/postcss-rpx-plugin/issues)
