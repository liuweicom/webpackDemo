# webpack-----遇坑记
#### 导语：
	作为一个前端小白，最近学习react的过程中，经常遇到新建项目，需要使用webpack，完全懵逼，碰到各种命令行报错，
	整的我都要怀疑人生。最近特地看了一些文档整理一下，结果还是遇到各种问题，有些还没解决，如果有幸被大佬看到，
	希望能够指点迷津，指条学习webpack的大道。
****
## 参考文章和视频
   * [Webpack3.X版 成神之路 全网首发 (共24集)](http://jspang.com/2017/09/16/webpack3-2/)
   * [Webpack 2 视频教程](https://devopen.club/course/webpack)
   * [webpack中文文档](https://doc.webpack-china.org/guides/getting-started/)
   * [Eslint 从入门到放弃](http://blog.csdn.net/walid1992/article/details/54633760)
   * [ESLint－配置](https://www.jianshu.com/p/2c7dd7cab6e5)
****
## 工程目录说明
* package.json 

    npm 管理配置，主要存放npm安装的第三方插件名和版本号等信息

* node_modules 

    被npm安装第三方包存放位置，使用npm install命令行安装

* webpack.config.js

    webpack 主配置，通过命令行参数从 cfg 目录下导入合适的配置

* cfg

    webpack 多配置，分为开发、发布、测试
     
* src 

    下直接对应的.jsx文件，为多个页面，对应的多个入口文件
    *app为对应多个页面的的内容
    *liuweicom为本工程的核心源代码目录
    
* babelrc文件
    
    babel配置文件，编译es6，react需要
    
* eslintrc
    
    校验语法问题
    
* editorconfig
    
    统一各种编辑器的格式的默认设置，例如默认tab为四个空格
    
****   
## 配置文件的详细参数说明
#### __webpack配置(代码注释中)__
#### Eslint配置
1. env：你的脚本将要运行在什么环境中Environment可以预设好的其他环境的全局变量，如brower、node环境变量、es6环境变量、mocha环境变量等</p>
<pre><code> 'env': {
        'browser': true,
        'commonjs': true,
        'es6': true
    }
</code></pre>
2. globals：额外的全局变量

示例：
<pre><code>globals: {
               vue: true,
               wx: true
             }</code></pre>

3. rules：开启规则和发生错误时报告的等级

示例：
<pre><code>'rules': {
               // no-var
               'no-var': 'error',
               // 要求或禁止 var 声明中的初始化
               'init-declarations': 2,
               // 强制使用单引号
               'quotes': ['error', 'single'],
               // 要求或禁止使用分号而不是 ASI
               'semi': ['error', 'never'],
               // 禁止不必要的分号
               'no-extra-semi': 'error',
               // 强制使用一致的换行风格
               'linebreak-style': ['error', 'unix'],
               // 空格2个
               'indent': ['error', 2, {'SwitchCase': 1}],
               // 指定数组的元素之间要以空格隔开(,后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
               'array-bracket-spacing': [2, 'never'],
               // 在块级作用域外访问块内定义的变量是否报错提示
               'block-scoped-var': 0,
               // if while function 后面的{必须与if在同一行，java风格。
               'brace-style': [2, '1tbs', {'allowSingleLine': true}],
               // 双峰驼命名格式
               'camelcase': 2,
               // 数组和对象键值对最后一个逗号， never参数：不能带末尾的逗号, always参数：必须带末尾的逗号， 
               'comma-dangle': [2, 'never'],
               // 控制逗号前后的空格
               'comma-spacing': [2, {'before': false, 'after': true}],
               // 控制逗号在行尾出现还是在行首出现
               'comma-style': [2, 'last'],
               // 圈复杂度
               'complexity': [2, 9],
               // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
               'computed-property-spacing': [2, 'never'],
               // TODO 关闭 强制方法必须返回值，TypeScript强类型，不配置
               // 'consistent-return': 0
             }</code></pre>

规则的错误等级有三种：

1. 0或'off'：关闭规则。
2. 1或'warn'：打开规则，并且作为一个警告（并不会导致检查不通过）。
3. 2或'error'：打开规则，并且作为一个错误 (退出码为1，检查不通过)。

参数说明：

1. 参数1 ： 错误等级 
2. 参数2 ： 处理方式

<pre><code>"comma-dangle": ["error", "never"]</code></pre>

上述配置只是简要将最基本的一些配置罗略出来，如果有需要建议去上方官网中查看。

4. 配置代码注释方式,有时我们可能要在代码中忽略eslint的某种检查，或者加入某种特定检查，此时我们可以用如下的方式：

示例：


* 忽略 no-undef 检查

    /* eslint-disable no-undef */ 

* 忽略 no-new 检查

    /* eslint-disable no-new */ 

* 设置检查

    /*eslint eqeqeq: off*/
    
    /*eslint eqeqeq: 0*/

* eslint 检查指令

        检查且修复
        eslint * --fix
        检查指定文件
        eslint app.js --fix

        --parser
        该选项允许你为 ESLint 指定一个解析器。默认情况下，使用 espree。
        
        extends 属性值可以是：
        在配置中指定的一个字符串,字符串数组：每个配置继承它前面的配置
        Using "eslint:recommended"值为 "eslint:recommended" 的 extends 属性启用一系列核心规则，这些规则报告一些常见问题，在 规则页面 中被标记为  。这个推荐的子集只能在 ESLint 主要版本进行更新。
        如果你的配置集成了推荐的规则：在你升级到 ESLint 新的主版本之后，在你使用命令行的 --fix 选项之前，检查一下报告的问题，这样你就知道一个新的可修复的推荐的规则将更改代码。

        eslint --init 命令可以创建一个配置，这样你就可以继承推荐的规则。

JavaScript 格式的一个配置文件的例子：

    module.exports = {
        "extends": "eslint:recommended",
        "rules": {
            // enable additional rules
            "indent": ["error", 4],
            "linebreak-style": ["error", "unix"],
            "quotes": ["error", "double"],
            "semi": ["error", "always"],
            // override default options for rules from base configurations
            "comma-dangle": ["error", "always"],
            "no-cond-assign": ["error", "always"],
            // disable rules from base configurations
            "no-console": "off",
        }
    }
这个选项指定一个要加载的插件。你可以省略插件名的前缀 **eslint-plugin-**。在你使用插件直接，你必须使用 npm 安装它
parserOptions其中可配置的参数包括：
* ecmaVersion - ECMAScript的版本，3、5(默认)、6
* sourceType -
* ecmaFeatures - 表示一些附加特性的对象：
* globalReturn - 在全局作用域允许return 语句
* impliedStrict - strict模式（ecma版本大于等于5）jsx - 支持jsx
* experimentalObjectRestSpread -

  .ealintrc.json文件示例：

        {
            "parserOptions": {
            "ecmaVersion": 6,
            "sourceType": "module",
            "ecmaFeatures": {
            "jsx": true
            },
        },
            "rules": {
            "semi": 2
            }
        }

parserOptions的配置决定ESLint认为哪些是错误。默认规则都是false

#### babel配置（没有整理的详细，参考文章很棒）
参考：[Babel 用户手册](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md#toc-babelrc)

Babel 插件解决许多不同的问题。 其中大多数是开发工具，可以帮助你调试代码或是与工具集成。 也有大量的插件用于在生产环境中优化你的代码。
因此，想要基于环境来配置 Babel 是很常见的。你可以轻松的使用 .babelrc 文件来达成目的。

        {
            "presets": ["es2015"],
            "plugins": [],
           "env": {
             "development": {
               "plugins": [...]
             },
             "production": {
               "plugins": [...]
             }
            }
          }


babel-plugin-import

按需加载插件。只需要引入模块即可，无需单独引入样式

导入js和css模块（css 内置文件）：

    [javascript] view plain copy
    ["import", { "libraryName": "antd", "style": "css或者为true" }]
      
如果webpack配置文件添加了vendor库，babel-plugin-import将不会工作。

__注意：babel,eslint的配置项中的插件名都是省略了前缀的__

*********

## 配置过程中遇到的坑
* 代码中参数的配置，有时候居然取不到args.env，为undefine, 不要问我怎么解决的，我也不知道，后来自己又好了，心累
webpack.config.js

    const args = require('minimist')(process.argv.slice(2));
    //命令行解析工具，npm 语句："start": "node ./dev-server.js --env=dev"，可以解析出env后面的值为dev
    
    //获得命令行指定的 环境为dev，还是prod生产环境
    let env;
    if (args._.length > 0 && args._.indexOf('start') !== -1) {
        env = 'test';
    } else if (args.env) {
        env = args.env;
    } else {
        env = 'dev';
    }
    //将env赋值给常量，webpack环境中判断是否是生成环境
    process.env.REACT_WEBPACK_ENV = env;
    
    default.js
    
        const minimize = process.env.REACT_WEBPACK_ENV === 'prod';
        ......
            {
                        test: /\.css$/,
                        use: ExtractTextPlugin.extract({//将样式表抽离成专门的单独文件
                            fallback: 'style-loader',  // 在开发环境使用 style-loader
                            use: [{ // loader 被用于将资源转换成一个 CSS 导出模块
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,//可以在 Chrome 中编辑原始的 Sass 文件
                                    minimize: minimize //当在生产环境下，进行压缩
                                }
                            }]
                        })
            }
    sourceMap: 方便开发编译的时候，直接找到出错具体的行数

    minimize: minimize //当在生产环境下，进行压缩

* postbuild:在某个命令行的前面加上post，npm会自动执行post前面的命令。

后续想到再加------
*********
