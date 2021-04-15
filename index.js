var postcss = require("postcss");

module.exports = postcss.plugin("postcss-rpx-plugin", function (options) {
  var unit = options?.unit || "rpx"; // 自定义的单位
  var width = options?.width || 750; // ui图宽度
  var precision = options?.precision || 5; // 配置精确度
  var outUnit = options?.outUnit || "vw"; // 输入单位
  var exclude = options?.exclude || ""; // 配置忽略文件，正则匹配
  var mediaQuery = options?.mediaQuery || true; // 媒体
  if (width < 375 || width > 2160) {
    console.error("Width should be between 375 and 2160");
    return;
  }
  return function (root, result) {
    if (exclude && root.source.input.file.match(exclude) !== null) {
      result.root = root;
      return;
    }
    if (mediaQuery) {
      root.walkAtRules("media", function (rule) {
        if (rule.params.indexOf(rule) === -1) return;
        rule.params = rule.params.replace(pxRegex, (_, args) => {
          const value = ((args / width) * 100).toFixed(precision);
          return value + outUnit;
        });
      });
    }
    root.walkRules(function (rule) {
      rule.walkDecls(function (decl) {
        if (decl.value.includes(unit)) {
          var regExp = new RegExp("(\\d+)(" + unit + ")", "g");
          decl.value = decl.value.replace(regExp, (_, args) => {
            const value = ((args / width) * 100).toFixed(precision);
            return value + outUnit;
          });
        }
      });
    });
  };
});
