'use strict';
let path = require('path');
let defaultSettings = require('./defaults');

module.exports = {
    devtool: 'hidden-source-map',
    //输出配置
    output: {
        path: path.join(__dirname, './../dist/'),
        publicPath: defaultSettings.publicPath,
        filename: 'main.js',
        library: "main",
        libraryTarget: 'umd'
    },
    devServer: {
        contentBase: './src/',
        historyApiFallback: true,
        hot: true,
        port: defaultSettings.port,
        noInfo: false,
        disableHostCheck: true
    },
    resolve: {
        //import文件的查找方式，如果不存在文件后缀，依次尝试 js jsx 后缀
        extensions: [ '.js', '.jsx'],
        modules: [defaultSettings.srcPath, 'node_modules','./../dist/']
    },
    module: {},
    externals : {//在打包的时候排除库
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
};
