'use strict';
let path = require('path');
 let webpack = require('webpack');

 let baseConfig = require('./base');
 let defaultSetting = require('./default');

 let entry = Object.assign({}, defaultSetting.entry);

//自动添加 webpack-dev-server 配置
defaultSetting.entryKeys.forEach((key) => {
    entry[key] = [
    	// 写在入口文件之前
        'webpack-dev-server/client?http://0.0.0.0:' + defaultSetting.port,
        'webpack/hot/only-dev-server',//前两个必须写在前面，并且安装webpack-hotloader必须先安装webpack-dev-server，详细看wepack-hot-loader
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
 	].concat(defaultSetting.plugins),
     module: defaultSetting.getDefaultModuleExport()
 });

 config.module.rules.push({
 	//使用 react-hot 的标准配置，babel-loader 通过参数的方式跟在 react-hot 后
    test: /\.(js|jsx)$/,
    use: ['react-hot-loader/webpack', 'babel-loader'],
    include: [].concat(
        defaultSetting.additionalPaths,
        [path.join(__dirname, '/../src')]
    )
 });

 config.devServer.stats = 'errors-only';

module.exports = config;