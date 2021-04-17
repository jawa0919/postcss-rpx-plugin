"use strict";

const postcss = require("postcss");

module.exports = postcss.plugin("postcss-rpx-plugin", function (options) {
  const unit = options?.unit || "rpx"; // 自定义的单位
  const width = options?.width || 750; // ui图宽度
  const precision = options?.precision || 5; // 配置精确度
  const outUnit = options?.outUnit || "vw"; // 输入单位，// TODO 其他单位
  const exclude = options?.exclude || ""; // 配置忽略文件，正则匹配
  if (width < 375 || width > 2160) {
    console.error("Width should be between 375 and 2160");
    return;
  }
  return function (root, result) {
    if (exclude && root.source.input.file.match(exclude) !== null) {
      result.root = root;
      return;
    }
    root.walkRules(function (rule) {
      rule.walkDecls(function (decl) {
        if (decl.value.includes(unit)) {
          // var regExp1 = /(\d+)(rpx)/g;
          // form https://github.com/vlev1n/postcss-rpx-loader/blob/master/index.js
          const r1 = new RegExp("(\\d+)(" + unit + ")", "g");
          // var regExp2 = /"[^"]+"|'[^']+'|url\([^\)]+\)|(\d*\.?\d+)rpx/g;
          // form https://github.com/yangmingshan/postcss-rpxtopx/blob/master/lib/rpx-unit-regex.js
          const r2 = new RegExp(
            "\"[^\"]+\"|'[^']+'|url\\([^\\)]+\\)|(\\d*\\.?\\d+)" + unit,
            "g"
          );
          decl.value = decl.value.replace(r2, (str, num1) => {
            if (num1 == undefined) return str;
            if (num1 == "0") return "0";
            const v = (num1 * 100) / width;
            const vI = parseInt(v);
            const vF = parseFloat(v);
            const value = vI == vF ? vI.toString() : vF.toFixed(precision);
            return value + outUnit;
          });
        }
      });
    });
  };
});
