# postcss-rpx-plugin

rpx2vw

[![Version npm](https://img.shields.io/npm/v/postcss-rpx-plugin.svg)](https://www.npmjs.com/package/postcss-rpx-plugin)

[![GitHub](https://img.shields.io/badge/github-jawa0919-brightgreen.svg)](https://github.com/jawa0919)

[![GitHub package.json version](https://img.shields.io/github/package-json/v/jawa0919/postcss-rpx-plugin)](https://github.com/jawa0919/postcss-rpx-plugin)

[![GitHub](https://img.shields.io/github/license/jawa0919/postcss-rpx-plugin)](https://github.com/jawa0919/postcss-rpx-plugin)

[中文 README](https://github.com/jawa0919/postcss-rpx-plugin/blob/master/README.zh-hans.md)

## Usage

### postcss@8

```
npm i postcss-rpx-plugin -D
```

### postcss@7 postcss@6 postcss@5

```
npm i postcss-rpx-plugin@1.0.3 -D
```

`package.json`

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

## CHANGELOG

### V2.0.0

- support postcss@8

### V1.0.3

- fix build `options?.unit` error
- fix type ?

### V1.0.2

- add @type

  ```ts
  import { AcceptedPlugin } from "postcss";

  declare function PostcssRpxPlugin(
    options: PostcssRpxPlugin.Options | Partial<PostcssRpxPlugin.Options>
  ): AcceptedPlugin;

  declare namespace PostcssRpxPlugin {
    interface Options {
      unit: string;
      width: number;
      precision: number;
      outUnit: string;  ，
      exclude: string | RegExp;
    }
  }

  export = PostcssRpxPlugin;
  ```

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
    const rules = ".rule { background: url(16rpx.jpg); }";
    const expected = ".rule { background: url(16rpx.jpg); }";
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
