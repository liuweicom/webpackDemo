'use strict';

let path = require('path');
let webpack = require('webpack');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

let output =Object.assign({}, baseConfig.output, {library: "main", libraryTarget: 'umd'});
let config = Object.assign({}, baseConfig, {
    entry: defaultSettings.entry,
    cache: false,
    output: output,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        //先将压缩关闭，有利于代码的查看
        new UglifyJSPlugin({
            uglifyOptions: {
                ie8: true,
                output: {
                    comments: false,
                    beautify: false
                },
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
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ].concat(defaultSettings.plugins),
    module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
// js 处理，使用 babel 进行转码
config.module.rules.push({
    test: /\.(js|jsx)$/,
    use: [{loader: 'babel-loader'}],
    include: [].concat(
        defaultSettings.additionalPaths,
        [path.join(__dirname, '/../src')]
    )
});

module.exports = config;
