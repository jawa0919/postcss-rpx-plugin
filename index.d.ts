/*
 * @FilePath     : \postcss-rpx-plugin\index.d.ts
 * @Date         : 2021-04-22 09:07:33
 * @Author       : wangjia <jawa0919@163.com>
 * @Description  : type
 */

import { AcceptedPlugin } from "postcss";

declare function PostcssRpxPlugin(
  options?: PostcssRpxPlugin.Options | Partial<PostcssRpxPlugin.Options>
): AcceptedPlugin;

declare namespace PostcssRpxPlugin {
  interface Options {
    unit: string; // 自定义的单位
    width: number; // ui图宽度
    precision: number; // 配置精确度
    outUnit: string; // 输入单位，
    exclude: string | RegExp; // 配置忽略文件，正则匹配
  }
}

export = PostcssRpxPlugin;
