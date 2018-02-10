'use strict';
 
 let path = require('path');;
 let webpack = require('webpack');;

 let baseConfig = require('./base');
 let defaultSetting = require('./default');

 let entry = Object.assign({}, defaultSetting.entry);;

//自动添加 webpack-dev-server 配置
defaultSetting.entryKeys.forEach((key) => {
    entry[key] = [
    	// 写在入口文件之前
        'webpack-dev-server/client?http://0.0.0.0:' + defaultSetting.port,
        'webpack/hot/only-dev-server',//前两个必须写在前面，并且安装webpack-hotloader必须先安装webpack-dev-server，详细看wepack-hot-ader
        entry[key]
    ];
});

 let config = Object.assign({},baseConfig,{
 	devtool: 'eval-source-map',
 	entry: entry,
 	cache: true,
 	plugins: [
 		new webpack.HotModuleReplacementPlugin(),//模块热替换(HMR)交换, 添加, 或者删除模块, 同时应用持续运行, 不需要页面刷新.
        new webpack.NamedModulesPlugin(), // 热替换时返回更新的文件名，而不是id
        new webpack.NoEmitOnErrorsPlugin()//在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。对于所有资源，统计资料(stat)的 emitted 标识都是 false。
 	],
 	module: defaultSetting.getDefaultModeuleExport()
 });

 config.module.rules.push({
 	test: /\.(js|jsx)$/,
 	use: ['react-hot-loader/webpack', 'babel-loader'],//就是使用 react 编写代码时，能让修改的部分自动刷新。但这和自动刷新网页是不同的，因为 hot-loader 并不会刷新网页，而仅仅是替换你修改的部分，参考https://segmentfault.com/a/1190000004660311
 	include: [].concat(
 		defaultSetting.additionalPath,
 		[path.join(__dirname,'./../src')]
 		)
 });

 config.devServer.stats = 'errors-only';

 module.exports = config;