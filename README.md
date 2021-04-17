# postcss-rpx-plugin

rpx2vw

[中文 README](https://github.com/jawa0919/postcss-rpx-plugin/blob/master/README.zh-hans.md)

## Usage

```
npm i postcss-rpx-plugin -D
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

## Thanks

[postcss-rpxtopx](https://github.com/yangmingshan/postcss-rpxtopx)

[postcss-rpx-loader](https://github.com/vlev1n/postcss-rpx-loader)
