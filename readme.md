#umd方式打包
需求：在工作过程中遇到，需要打出来的包支持commonjs规范，AMD规范，全局变量的方式使用打包文件。
####commonJs规范写法
````
// 定义模块 area.js
function area(radius) {
  return Math.PI * radius * radius;
}

// 在这里写上需要向外暴露的函数、变量
module.exports = { 
  area: area
}

// 引用自定义的模块时，参数包含路径
var math = require('./math');
math.area(2);
````
####AMD规范写法
````
// 定义 moduleA 依赖 a, b模块
define(['./a','./b'],function(a,b){
   a.doSomething()
   b.doSomething()
}) 

// 使用
require(['./moduleA'], function(moduleA) {
  // ...
})
````
####CMD规范写法
````
define(function(require, exports, module) {
  var a = require('./a')
  a.doSomething()
  var b = require('./b')
  b.doSomething()
})
````
####es6规范写法
````
import a from './a'
import b from './b'

a.doSomething()
b.doSomething()

function c () {}

export default c
````
不懂他们规范区别的请看[CommonJS、AMD/CMD、ES6 Modules 以及 webpack 原理浅析](https://blog.csdn.net/qq_39198420/article/details/80694337)
要想打出来的包，能支持这些模式。它的导出形式，必须是类似这样的:

````
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("moment"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "moment"], factory);
	else if(typeof exports === 'object')
		exports["antd"] = factory(require("react"), require("react-dom"), require("moment"));
	else
		root["antd"] = factory(root["React"], root["ReactDOM"], root["moment"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_22__) {
return /******/ (function(modules) { // webpackBootstrap
````

webpack配置：

深入了解[【深入理解webpack】library,libraryTarget,externals的区别及作用](https://blog.csdn.net/whh181/article/details/80613633)
````
output: {
        path: path.join(__dirname, './../dist/'),
        publicPath: defaultSettings.publicPath,
        filename: 'main.js',
        library: "main", 
        libraryTarget: 'umd' //重点配置长umd的模式
    },
  
 externals : {
        react: {
            root: 'React',//如果我们的库在浏览器中使用，需要提供一个全局的变量‘React’，等价于 var React = (window.React) or (React);
                        //  有一点需要注意的是，假如lodash中在浏览器环境中不提供React的全局变量，那么就没有办法使用。这个"React"是不能随便乱写的。如果外部库react提供的是全局变量React,那你就得使用React。
            commonjs: 'react',//如果我们的库运行在Node.js环境中，import React from 'react'等价于const React= require('react')
            commonjs2: 'react',//同上
            amd: 'react'//如果我们的库使用require.js等加载,等价于 define(["react"], factory);
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
    }
````
externals的配置是由于在打包时遇到的坑，打出来的包，命名引入了需要的模块任然无法起作用，原来是引入的名字与依赖的名字不符合

summer
暂时就回忆起这一个坑，其他掠过，不过打包和编译是的配置是存在区别的，编译的包的 externals的配置存在一定差异。




