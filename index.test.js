"use strict";

const postcss = require("postcss");
const rpx2vm = require("./");

describe("postcss-rpx-plugin", () => {
  it("should replace the rpx unit with vw - Int", () => {
    const rules = ".rule { margin: 10rpx 375rpx 0rpx 10px; }";
    const expected = ".rule { margin: 1.33333vw 50vw 0 10px; }";
    const processed = postcss(rpx2vm()).process(rules).css;
    expect(processed).toBe(expected);
  });

  it("should replace the rpx unit with vw - Float", () => {
    const rules = ".rule { height: 375.0rpx; }";
    const expected = ".rule { height: 50vw; }";
    const processed = postcss(rpx2vm()).process(rules).css;
    expect(processed).toBe(expected);
  });

  it("should not replace values in `url()`", () => {
    const rules = ".rule { background: url(16rpx.jpg); }";
    const expected = ".rule { background: url(16rpx.jpg); }";
    const processed = postcss(rpx2vm()).process(rules).css;
    expect(processed).toBe(expected);
  });
});
