const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path=require('path');
module.exports={
	entry:{
		app:__dirname+'/app/main.js'//entry和outpot都需要绝对路径
	},
	output:{
		path:__dirname+'/build',//都是webpack可以用webpack-dev-server不会生成？？？build文件
		filename:'[name].bundle.js'
	},
	devServer:{
		contentBase:'./build',//本地服務器所加载的页面的目录
		historyApiFallback:true,//如果设置为true，所有的跳转将指向index.html
		inline:true,//当源文件改变时会自动刷新页面
		hot:true,
		port:5010
	},
	module:{
		rules:[
		{
			test:/(\.jsx|\.js)$/,
			use:{
				loader:"babel-loader"
			},
			exclude:/node_modules/
		},{
			test: /\.css$/,
			use: [
				{
                    loader: "style-loader"
                }, 
				{
					loader: 'css-loader',
					options: {
						modules: true//Webpack从一开始就对CSS模块化提供了支持，在CSS loader中进行配置后，你所需要做的一切就是把”modules“传递到所需要的地方，然后就可以直接把CSS的类名传递到组件的代码中，且这样做只对当前组件有效，不必担心在不同的模块中使用相同的类名造成冲突。
				    }
				},
				{
					loader: 'postcss-loader',
				}
				]
		},{
				test: /\.json$/,
				loader: "json-loader"
		},
		// {
		// 		test:/\.(png|svg|jpg|gif)$/,
		// 		use:[
		// 			'file-loader'//这种写法是正确的
		// 		]
		// },
		{
				test:/\.(woff|woff2|eot|ttf|otf)$/,
				use:[
					'file-loader'
				]
		},
		// {
  //               test: /\.(png|jpg|jpeg|gif)$/,
  //               loader: 'url-loader',
  //               options: {
  //                   limit: 8192,
  //                   name: 'assets/images/[name].[hash:8].[ext]'
  //               }
  //       },//没用
            // 音频视频等多媒体文件
            {
                test: /\.(mp4|ogg|mp3)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/media/[name].[hash:8].[ext]'
                }
            }
		]
	},
	plugins:[
		new CleanWebpackPlugin(['build']),
		new webpack.BannerPlugin('版权所有，翻版必究'),
		new HtmlWebpackPlugin({
			template:__dirname+"/app/index.tmpl.html"
		}),//通常与entry，output多个入口文件，生成多个出口文件，HtmlWebpackPlugin会将出口文件自动引入到html中
		new webpack.NamedModulesPlugin()//动态模块替换（HMR）会在应用运行时动态的替换、添加或者删除模块而不用重新刷新页面
	]	
}