/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const webpack = require('webpack');
const glob = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const marked = require('marked');
const renderer = new marked.Renderer();

const isProduction = process.env.REACT_WEBPACK_ENV === 'dist';

const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8100;

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
    return {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: srcPath,
                enforce: 'pre',
                use: 'eslint-loader'//js,jsx 预处理，先通过 eslint 语法校验
            },
            {
                test: /\.md$/,
                use: ['html-loader', 'markdown-loader']
            },
            //css加载
            {
                test: /\.css$/,
                //单独打包css
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            minimize: isProduction
                        }
                    }]
                })
            },
            //sass 加载，先通过 sass-loader 转化为 css，然后跟普通的 css 加载一样
            {
                test: /\.(sass|scss)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',//css-loader使你能够使用类似@import和url（...）的方法实现require的功能
                            options: {
                                sourceMap: true,
                                minimize: isProduction
                            }
                        },
                        {
                            loader: 'postcss-loader',//处理css的浏览器兼容性问题
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                minimize: isProduction,
                                outputStyle: 'expanded'
                            }
                        }
                    ]
                })
            },
            //less 加载，先通过 less-loader 转化为 css，然后跟普通的 css 加载一样
            {
                test: /.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                minimize: isProduction
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {sourceMap: true}
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true,
                                minimize: isProduction
                            }
                        }
                    ]
                })
            },
            // 字体文件(eg: .ttf/.ttf?v=123)
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
            }
        ]
    };
}

//自动从 entries 获取需要打包的 js 文件
const files = glob.sync('./src/uwd/*.js');
let entryKeys = [];
let entries={};
if(files.length == 1){
    const name = path.basename(files[0], path.extname(files[0]));
    entryKeys.push(name);
    entries[name]=files[0];
}else{
    entries = files.reduce(function (memo, file) {
        const name = path.basename(file, path.extname(file));
        entryKeys.push(name);
        memo[name] = file;
        return memo;
    });
}

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
let npmBase = path.join(__dirname, '../node_modules');
let additionalPaths = [ path.join(npmBase, '@ud/es-collections') ];

module.exports = {
    additionalPaths: additionalPaths,
    srcPath: srcPath,
    entry: entries,
    entryKeys: entryKeys,
    publicPath: './',
    port: dfltPort,
    getDefaultModules: getDefaultModules,
    markdownLoader: {
        markedOptions: {
            renderer: renderer,
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: true,
            sanitize: true,
            smartLists: true,
            smartypants: true
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            UWD_VERSION: JSON.stringify(require('../package.json').version)
        }),
        // 它的用途是帮助人们从 webpack 1 迁移至 webpack 2
        new webpack.LoaderOptionsPlugin({
            debug: true
        }),
        new LodashModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

        new ExtractTextPlugin({
            filename: '[name].css',
            disable: false,
            allChunks: true
        }),
        new CopyWebpackPlugin([
            {from: 'node_modules/react/dist', to: 'lib/react/dist/'},
            {from: 'node_modules/react-dom/dist', to: 'lib/react-dom/dist/'},
            {from: 'node_modules/moment/min', to: 'lib/antd/dist/'},
            {from: 'node_modules/antd/dist', to: 'lib/antd/dist/'}
        ], {
            ignore: [
                '*.less',
                '*.scss'
            ]
        })
    ]
};
