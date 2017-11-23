const webpackDevServer=require('webpack-dev-server');
const webpack=require('webpack');
const open = require('open');
const config=require('./webpack.config.js');
// const option={
// 		contentBase:'./build',//本地服務器所加载的页面的目录
// 		historyApiFallback:true,//如果设置为true，所有的跳转将指向index.html
// 		inline:true,//当源文件改变时会自动刷新页面
// 		hot:true,
// 		port:5000
// };

// webpackDevServer.addDevServerEntrypoints(config,config.devServer);//用于在config外面配置devServer
const compiler=webpack(config);
const server=new webpackDevServer(compiler,config.devServer);

server.listen(5010, '0.0.0.0',(err)=>{
	 if (err) {
            console.log(err);
        }
    console.log('Listening at localhost:' + config.devServer.port);
	console.log('dev server listening on port 5000');
	open('http://localhost:' + config.devServer.port);
});
