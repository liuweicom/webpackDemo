const webpack=require('webpack');
const merge=require('webpack-merge');
const common = require('./webpack.common.js');

module.exports=merge(common,{
	devtool:'eval-source-map'
	// plugins:[
	// 	new webpack.HotModuleReplacementPlugin()//热加载插件，热替换和dev-server的hot有什么区别？不用刷新页面，可用于生产环境
	// ]
});