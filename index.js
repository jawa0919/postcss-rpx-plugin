"use strict";

module.exports = (opt = {}) => {
  opt = {
    unit: "rpx", // 自定义的单位
    width: 750, // ui图宽度
    precision: 5, // 配置精确度
    outUnit: "vw", // 输出单位，
    exclude: "", // 配置忽略文件，正则匹配
    ...opt,
  };
  const { unit, width, precision, outUnit, exclude } = opt;
  if (width < 375 || width > 2160) {
    console.error("Width should be between 375 and 2160");
    return;
  }
  return {
    postcssPlugin: "postcss-rpx-plugin",
    Once(root, { result }) {
      if (exclude && root.source.input.file.match(exclude) !== null) {
        result.root = root;
        return;
      }
      root.walkRules(function (rule) {
        rule.walkDecls(function (decl) {
          if (decl.value.includes(unit)) {
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
    },
  };
};

module.exports.postcss = true;
