# webpack-----遇坑记
#### 导语：
	作为一个前端小白，最近学习react的过程中，经常遇到新建项目，需要使用webpack，完全懵逼，碰到各种命令行报错，整的我都要怀疑人生。最近特地看了一些文档整理一下，结果还是遇到各种问题，有些还没解决，如果有幸被大佬看到，希望能够指点迷津，指条学习webpack的大道。
****
## 参考文章
   *[webpack－生产环境最佳实践](http://blog.csdn.net/cotexarm7/article/details/76836732)
   *[Webpack入门](http://blog.csdn.net/liujie19901217/article/details/51026943)
   *[webpack中文文档](https://doc.webpack-china.org/guides/getting-started/)

## 常用的webpack命令
* 在开发环境构建一次 
webpack 
* 构建并生成源代码映射文件 
webpack -d 
* 在生成环境构建，压缩、混淆代码，并移除无用代码 
webpack -p 
* 快速增量构建，可以和其他选项一起使用 
webpack –watch 
* progress 显示打包过程中的进度，colors打包信息带有颜色显示 
webpack –progress –colors
* 输出性能数据，可以看到每一步的耗时
webpack  --profile
* 默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块
webpack --display-modules

## 常用的webpack-dev-server命令
–progress 显示打包进度 
–colors配置打包输出颜色显示 
–hot热加载，代码修改完后自动刷新 
–inline 是刷新后的代码自动注入到打包后的文件中(当源文件改变时会自动刷新页面) 
-d 是debug模式，输入一个source-map，并且可以看到每一个打包的文件 
-p 是对代码进行压缩 

## 常用插件功能说明：
* 1OccurenceOrderPlugin：给经常使用的模块分配最小长度的id，这样可以减少文件大小。 
* HotModuleReplacementPlugin：是热替换，热替换和dev-server的hot有什么区别？不用刷新页面，可用于生产环境。 
* NoErrorsPlugin：在打包时不会因为错误而中断 
* ProvidePlugin: 定义一些在import时能自动引入的变量，如定义了 $: 'jquery' 后，可以在文件中直接使用$，webpack可以自动帮你加上 var $ = require('jquery')。 
* DllPlugin: 将一些模块预编译，类似windows里的dll，可以在项目中直接使用，无需再构建。注意要在output中指定 library ，并在DllPlugin中指定与其一致的 name ，在有多个入口时可以使用 [name] 和 [hash] 来区分，因为这个参数是要赋值到global上的，所以这里使用 [hash] 不容易出现变量名冲突的情况。 
* DllReferencePlugin: 引用之前打包好的dll文件，注意下context参数，这个应该根据manifest.json文件中的引用情况来赋值，如果引用的都是npm安装的库，这里就填项目根目录就好了。 
* DefinePlugin: 可以定义编译时的全局变量，有很多库（React, Vue等）会根据 NODE_ENV 这个变量来判断当前环境。为了尽可能减少包大小，在生产环境中要定义其为 JSON.stringify(“production”) 
* optimize.UglifyJsPlugin: 配置压缩代码。 
* optimize.DedupePlugin: 可以减少重复文件数。 
* ExtractTextPlugin: 可以将所有css文件打包到一个css文件中

## 遇到的问题
运行node时遇到下述提示：
events.js:160  throw er; // Unhandled 'error' event或者events.js:160       throw er; // Unhandled 'error' event       ^  Error: listen EADDRNOTAVAIL 172.16.1.228:3003。
本来程序运行的好好的，有一次启动时提示我们上面的信息，经从网上查找答案是：此端口已被占用，改换其他端口。然后是一系列解决方案。
下面说说我遇到这个问题是怎样解决：
1、我换了端口，没有效果，依旧有上述提示。
2、查看当前被端口占用的进程，没的找到。
3、监听函数所有参数已写完整。ip地址是我本地ip地址。实在纳闷，到底是哪里出了差错。
4、从stactoverflow中查找到答案说让重新安装整个node_modules文件夹下的node,我看了后果断放弃，我里面用到了很多包，重新搭的话还不知道遇到什么问题。
5、无奈之下把程序中监听地址中的本机ip换成了127.0.0.1。靠！居然成功。我纳闷，这是在逗我吗？然后果断看了看电脑上的本地ip，再次傻住，我去！我本地电脑ip已变，你怎么说变就变了！好吧，原来如此，把程序中ip地址改成127.0.0.1最靠谱。

实践结果：端口改了，本电脑IP也改了，有效，命令行不报错了。
[报错解决方法参考原文](http://www.cnblogs.com/lxxhome/p/7154452.html)

其他的太乱了。改进以后再写。。。。