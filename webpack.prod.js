const merge=require('webpack-merge');
const common = require('./webpack.common.js');
const webpack=require('webpack');

module.exports=merge(common,{
	devtool: 'source-map',
	plugins:[
		new webpack.LoaderOptionsPlugin({
     		minimize: true,
      		debug: false
    	}),//加载loader插件的一些配置选项，如postcss loader，你可以直接新建一个postcss.config.js文件
		// new UglifyJSPlugin({
		// 	  sourceMap: true
		// }),//能够删除未引用代码
		new webpack.DefinePlugin({
       'process.env': {
         'NODE_ENV': JSON.stringify('production')
       }
     }),
		new webpack.optimize.UglifyJsPlugin({
            // 最紧凑的输出
            beautify: false,
            // 删除所有的注释
            comments: false,
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
        })
	]
});