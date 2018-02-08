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
			use: ExtractTextPlugin.extract({//将样式表抽离成专门的单独文件
				fallback: 'style-loader',  // 在开发环境使用 style-loader
				use: [{ // loader 被用于将资源转换成一个 CSS 导出模块
					loader: 'css-loader',
					options: {
						sourceMap: true,//可以在 Chrome 中编辑原始的 Sass 文件
						minimize: minimize //当在开发环境下，进行压缩
					}
				}]
			})
		},{
			//sass加载，先通过sass-loader转化为css,然后和普通的css加载一样
			test: /\.(sass|scss)/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
				{
					loader:'css-loader',
					options: {
						sourceMap: true,
						minimize: minimize
					}
				},{
					loader:'post-loader',
					options: {
						sourceMap: true
					}
				},{
					loader:'sass-loader',
					options: {
						sourceMap: true,
						minimize: minimize,
						outputStyle: 'expanded'//?????budong
					}
				}]
			})
		},{
			// less 加载，先通过 less-loader 转化为 css，然后跟普通的 css 加载一样
			test:/.less$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [
					{
					loader:'css-loader',
					options: {
						sourceMap: true,
						minimize: minimize
					}
				},{
					loader:'post-loader',
					options: {
						sourceMap: true
					}
				},{
					loader:'less-loader',
					options: {
						sourceMap: true,
						minimize: minimize
					}
				}]
			})
		},// 字体文件(eg: .ttf/.ttf?v=123)
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: 'static/fonts/[name].[hash:8].[ext]'
                }
            },
            // 音频视频等多媒体文件
            {
                test: /\.(mp4|ogg|mp3)$/,
                loader: 'file-loader',
                options: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            // 图片加载，如果小于 8KB，则使用 base64 数据加载，否则使用普通文件的方式加载
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'static/images/[name].[hash:8].[ext]'
                }
            }]
	}
}

//自动从 entries 获取需要打包的 js 文件
//glob模块允许你使用 *等符号, 来写一个glob规则,像在shell里一样,获取匹配对应规则的文件
const files = glob.sync('./src/*.jsx');
let entryKeys = [];
const entries = files.reduce(function(memo,file){
	const name= files.basename(file, path.extname(file));
	entryKeys.push(name);
	memo[name] = file;
	return memo;
},{
	vendor: ['antd']
});


const srcPath = path.join(__dirname,'/../src');
const defaulePort = 8300;
const lodashWebpackPlugin = require('lodash-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
let plugins = [
	//这个插件配置全局/共享的 loader 配置，使所有的 loader 都能收到这些配置。
	new webpack.LoaderOptionPlugin({
		debug: true
	}),
	//优化压缩之后的大小
	new lodashWebpackPlugin({
		paths: true
	}),
	new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),//忽略本地化
	new ExtractTextPlugin({
		filename: '[name].css',
		disable: false,
		allChunks: true
	}),
	//在webpack中拷贝文件和文件夹
	// from    定义要拷贝的源目录           from: __dirname + ‘/src/public’
	// to      定义要拷贝到的目标目录     from: __dirname + ‘/dist’
	// toType  file 或者 dir         可选，默认是文件
	// force   强制覆盖先前的插件           可选 默认false
	// context                         可选 默认base context可用specific context
	// flatten 只拷贝文件不管文件夹      默认是false
	// ignore  忽略拷贝指定的文件           可以用模糊匹配
	new copyWebpackPlugin({}),

	// name：可以是已经存在的chunk（一般指入口文件）对应的name，那么就会把公共模块代码合并到这个chunk上；否则，会创建名字为name的commons chunk进行合并
	// filename：指定commons chunk的文件名
	// chunks：指定source chunk，即指定从哪些chunk当中去找公共模块，省略该选项的时候，默认就是entry chunks
	// minChunks：既可以是数字，也可以是函数，还可以是Infinity，具体用法和区别下面会说
	new webpack.optimize.CommonsChunkPlugin({
            //可以指定多个 entryName，打出多个 common 包
            index: '../src/index.jsx',
            login: '../src/login.jsx',
            register: '../src/register.jsx',
            registerResult: '../src/registerResult.jsx',
            names: ['common', 'vendor'], // 最后一项包含 webpack runtime
            minChunks: 2 // 被引用超过2次的模块放入common.js (对多页有意义，单页不会生成 common.js)
        }),

	//引用文章：html-webpack-plugin详解 https://www.cnblogs.com/wonyun/p/6030090.html
	// 	title: 生成的html文档的标题。配置该项，它并不会替换指定模板文件中的title元素的内容，除非html模板文件中使用了模板引擎语法来获取该配置项值，如下ejs模板语法形式：
	// <title>{%= o.htmlWebpackPlugin.options.title %}</title>
	// filename：输出文件的文件名称，默认为index.html，不配置就是该文件名；此外，还可以为输出文件指定目录位置（例如'html/index.html'）
	// 关于filename补充两点：
	// 1、filename配置的html文件目录是相对于webpackConfig.output.path路径而言的，不是相对于当前项目目录结构的。
	// 2、指定生成的html文件内容中的link和script路径是相对于生成目录下的，写路径的时候请写生成目录下的相对路径。
	// template: 本地模板文件的位置，支持加载器(如handlebars、ejs、undersore、html等)，如比如 handlebars!src/index.hbs；
	// 关于template补充几点：
	// 1、template配置项在html文件使用file-loader时，其所指定的位置找不到，导致生成的html文件内容不是期望的内容。
	// 2、为template指定的模板文件没有指定任何loader的话，默认使用ejs-loader。如template: './index.html'，若没有为.html指定任何loader就使用ejs-loader
	// templateContent: string|function，可以指定模板的内容，不能与template共存。配置值为function时，可以直接返回html字符串，也可以异步调用返回html字符串。
	// inject：向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同。
		// 1、true或者body：所有JavaScript资源插入到body元素的底部
		// 2、head: 所有JavaScript资源插入到head元素中
		// 3、false： 所有静态资源css和JavaScript都不会注入到模板文件中
	// favicon: 添加特定favicon路径到输出的html文档中，这个同title配置项，需要在模板中动态获取其路径值
	// hash：true|false，是否为所有注入的静态资源添加webpack每次编译产生的唯一hash值，添加hash形式如下所示：
		// html <script type="text/javascript" src="common.js?a3e1396b501cdd9041be"></script>
	// chunks：允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。在配置多个页面时，每个页面注入的thunk应该是不相同的，需要通过该配置为不同页面注入不同的thunk；
	// excludeChunks: 这个与chunks配置项正好相反，用来配置不允许注入的thunk。
	// chunksSortMode: none | auto| function，默认auto； 允许指定的thunk在插入到html文档前进行排序。
	// >function值可以指定具体排序规则；auto基于thunk的id进行排序； none就是不排序
	// xhtml: true|fasle, 默认false；是否渲染link为自闭合的标签，true则为自闭合标签
	// cache: true|fasle, 默认true； 如果为true表示在对应的thunk文件修改后就会emit文件
	// showErrors: true|false，默认true；是否将错误信息输出到html页面中。这个很有用，在生成html文件的过程中有错误信息，输出到页面就能看到错误相关信息便于调试。
	// minify: {....}|false；传递 html-minifier 选项给 minify 输出，false就是不使用html压缩。
	new htmlWebpackPlugin({			//多个页面时一般需要配置多个
		template: 'src/lib/app/index.ejs',
		filename：'index.html',//输出时的文件名
		title: 'hello world',
		cache: true,
		favicon: 'src/lib/liuweicom.jpg',
		stylesheets: [],       //自定义一些自己想要添加到页面中的css，这里面应用的路径是编译之后所在的路径！！
		script: [],            //自定义一些想要添加到页面中的js，这里面应用的路径是编译之后所在的路径
		chunks：[],				//更具入口划分的块，你需要添加的对应的块的js文件，会自动添加
		minify: {				//html中需要压缩的东西
			removeComments: true,
			collapseWhitespace: minimize
		}				
	});
];
const additionalPaths = [];
module.exports = {
	getDefaultModeuleExport: getDefaultModeuleExport,
	port: defaulePort,
	entry: entries,
	publicPath: './',
	srcPath: srcPath,
	entryKeys: entryKeys,
	plugins: plugins,
	additionalPaths: additionalPaths
};