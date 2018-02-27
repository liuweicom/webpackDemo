'use strict';

let path = require('path');
let webpack = require('webpack');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let webpackNotifierPlugin = require('webpack-notifier');
let baseConfig = require('./base');
let defaultSetting = require('./default.js');

let config = Object.assign({}, baseConfig, {
	entry: defaultSetting.entry,
	cache: false,
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": '"prod"'
		}),//允许你创建一个在编译时可以配置的全局常量

		//编译完成后给一个Notifier提示
		new webpackNotifierPlugin({
			title: 'webpack 编译成功',
			contentImage: path.resolve(process.cwd(),'./src/liuweicom/lib/liuweicom.jpg'),//process.cwd() 是当前执行node命令时候的文件夹地址 ——工作目录，保证了文件在不同的目录下执行时，路径始终不变
			alwaysNotify: true
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),//作用是让代码文件更小、运行的更快
		new UglifyJSPlugin({
            uglifyOptions: {
                ie8: true,
                output: {
                    comments: false,
                    beautify: false
                },
                compress: {
                    // 在UglifyJs删除没有用到的代码时不输出警告
                    warnings: false,
                    // 删除所有的 `console` 语句
                    // 还可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true
                }
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),//AggressiveMergingPlugin
        new webpack.NoEmitOnErrorsPlugin()//在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
	].concat(defaultSetting.plugins),
    module: defaultSetting.getDefaultModuleExport()
});
// Add needed loaders to the defaults here
// js 处理，使用 babel 进行转码
config.module.rules.push({
    test: /\.(js|jsx)$/,
    use: [{loader: 'babel-loader'}],
    include: [].concat(
        defaultSetting.additionalPaths,
        [path.join(__dirname, '/../src')]
    )
});

module.exports = config;