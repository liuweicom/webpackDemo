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

##Eslint配置
参考【http://blog.csdn.net/walid1992/article/details/54633760】
env：你的脚本将要运行在什么环境中Environment可以预设好的其他环境的全局变量，如brower、node环境变量、es6环境变量、mocha环境变量等
'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  }
  globals：额外的全局变量

示例：

globals: {
    vue: true,
    wx: true
  },
1
2
3
4
rules：开启规则和发生错误时报告的等级

示例：

'rules': {
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
  }
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
规则的错误等级有三种：

0或'off'：关闭规则。
1或'warn'：打开规则，并且作为一个警告（并不会导致检查不通过）。
2或'error'：打开规则，并且作为一个错误 (退出码为1，检查不通过)。
1
2
3
4
参数说明：

参数1 ： 错误等级 
参数2 ： 处理方式

"comma-dangle": ["error", "never"],
1
上述配置只是简要将最基本的一些配置罗略出来，如果有需要建议去上方官网中查看。

配置代码注释方式
有时我们可能要在代码中忽略eslint的某种检查，或者加入某种特定检查，此时我们可以用如下的方式：

示例：

忽略 no-undef 检查
/* eslint-disable no-undef */ 
1
忽略 no-new 检查
/* eslint-disable no-new */ 
1
设置检查
/*eslint eqeqeq: off*/
/*eslint eqeqeq: 0*/
1
2
eslint 检查指令
检查且修复
eslint * --fix
1
检查指定文件
eslint app.js --fix
--parser
该选项允许你为 ESLint 指定一个解析器。默认情况下，使用 espree。
extends 属性值可以是：
在配置中指定的一个字符串
字符串数组：每个配置继承它前面的配置
Using "eslint:recommended"
值为 "eslint:recommended" 的 extends 属性启用一系列核心规则，这些规则报告一些常见问题，在 规则页面 中被标记为  。这个推荐的子集只能在 ESLint 主要版本进行更新。
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
这个选项指定一个要加载的插件。你可以省略插件名的前缀 eslint-plugin-。在你使用插件直接，你必须使用 npm 安装它
parserOptions其中可配置的参数包括：
ecmaVersion - ECMAScript的版本，3、5(默认)、6
sourceType -
ecmaFeatures - 表示一些附加特性的对象：
globalReturn - 在全局作用域允许return 语句
impliedStrict - strict模式（ecma版本大于等于5）
jsx - 支持jsx
experimentalObjectRestSpread -
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
作者：guo_xiaoqing
链接：https://www.jianshu.com/p/2c7dd7cab6e5
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
###babel配置：参考：【 https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md#toc-babelrc】
Babel 插件解决许多不同的问题。 其中大多数是开发工具，可以帮助你调试代码或是与工具集成。 也有大量的插件用于在生产环境中优化你的代码。
因此，想要基于环境来配置 Babel 是很常见的。你可以轻松的使用 .babelrc 文件来达成目的。
  {
    "presets": ["es2015"],
    "plugins": [],
+   "env": {
+     "development": {
+       "plugins": [...]
+     },
+     "production": {
+       "plugins": [...]
+     }
    }
  }


babel-plugin-import
按需加载插件。只需要引入模块即可，无需单独引入样式
导入js和css模块（css 内置文件）：
[javascript] view plain copy
["import", { "libraryName": "antd", "style": "css或者为true" }]  
如果webpack配置文件添加了vendor库，babel-plugin-import将不会工作。
注意：babel,eslint的配置项中的插件名都是省略了前缀的
