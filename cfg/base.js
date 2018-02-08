'use strict';
let path = require('path');
let defauleSetting = require('./default.js');

module.exports={
	devtool: 'hidden-source-map',//对于生产环境
	// source-map - 生成完整的 SourceMap，输出为独立文件。由于在 bundle 中添加了引用注释，所以开发工具知道在哪里去找到 SourceMap。
	// hidden-source-map - 和 source-map 相同，但是没有在 bundle 中添加引用注释。如果你只想要 SourceMap 映射错误报告中的错误堆栈跟踪信息，但不希望将 SourceMap 暴露给浏览器开发工具
	output: {
		path: path.join(__dirname,'./../dist'),
		filename: '[name].js',
		publicPath: defauleSetting.publicPath
	},
	devServer: {
		contentBase: './src/',
		historyApiFallback: true,
		port: defauleSetting.port,
		noInfo: false,
		disableHostCheck: true
	},
	resolve: {//这些选项能设置模块如何被解析
		alias: {
			//创建 import 或 require 的别名，来确保模块引入变得更简单
			'app': path.join(__dirname,'./../src/lib/app')
		},
		 //import文件的查找方式，如果不存在文件后缀，依次尝试 js jsx 后缀
        extensions: ['.js', '.jsx'],
        //告诉 webpack 解析模块时应该搜索的目录。如果你想要添加一个目录到模块搜索目录，此目录优先于 node_modules/ 搜索：
        module: [defauleSetting.srcPath, 'node_modules']
	},
	module: {},
	externals: {//可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问。
		react: 'window.React',
        'react-dom': 'window.ReactDOM',
        axios: 'window.axios'
	}
}