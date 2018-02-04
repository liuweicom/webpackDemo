'use strict';

let path = require('path');
let webpack = require('webpack');
const srcPath = path.join(__dirname, '../src');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const minimize = process.env.REACT_WEBPACK_ENV === 'dist';

function getDefaultModeuleExport() {
	return {
		// test：用于匹配处理文件的扩展名的表达式，这个选项是必须进行配置的；
		// use：loader名称，就是你要使用模块的名称，这个选项也必须进行配置，否则报错；
		// include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
		// query：为loaders提供额外的设置选项（可选）。

		//js,jsx 预处理，先通过 eslint 语法校验
		rules: [{
			test: /\.(js|jsx)$/,
			include: srcPath, //指定需要要处理的文件，此处为自己写的代码的位置
			enforce: 'pre', // 标识应用这些规则，即使规则覆盖（高级选项）,表示这个必须的应用的规则
			use: ['eslint-loader'] //use的调用顺序是从右到左，从里到外
		}, {
			test: /\.js\.maps/,
			use: {
				loader: 'file-loader'
			}
		}, {
			test: /\.md$/,
			use: ['html-loader', 'markdown-loader']
		}, {
			test: /\.css$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader', // loader（例如 'style-loader'）应用于当 CSS 没有被提取
				use: [{ // loader 被用于将资源转换成一个 CSS 导出模块
					loader: 'css-loader',
					options: {
						sourceMap: true,
						minimize: minimize //当在开发环境下，进行压缩
					}
				}]
			})
		}]
	}
}