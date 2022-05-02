/*
 * @FilePath     : /index.d.ts
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
    /**
     * 自定义的单位,触发转换的单位 - 默认`rpx`
     *
     * 可以自定义的字段，甚至可以设置为`abc`，这样就可以为`abc`的单位触发转换
     *
     * @default 'rpx'
     * @type string
     */
    unit: string;
    /**
     * ui图宽度，除法运算值时的基准宽度 - 默认750
     *
     * 根据自己的项目设置
     *
     * @default 750
     */
    width: number;
    /**
     * 单位转换的精度 - 默认5
     *
     * 除到小数点后的位数
     *
     * @default 5
     * @type number
     */
    precision: number; // 折算时结果的精确-默认5，即小数点后5位
    /**
     * 转换后的单位 - 默认`vw`
     *
     * 最终在css中单位，也可以自定义配合其他插件使用
     *
     * @default `vw`
     * @type string
     */
    outUnit: string;
    /**
     * 忽略的文件匹配 - 默认为空
     *
     * 可以设置为数组，如：['a.css', 'b.vue']
     *
     * @default ""
     * @type string | string[]
     */
    exclude: string | string[] | RegExp;
  }
}

export = PostcssRpxPlugin;
