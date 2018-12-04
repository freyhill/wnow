### module 配置如何处理模块。

 rules 配置模块的读取和解析规则，通常用来配置 Loader。其类型是一个数组，数组里每一项都描述了如何去处理部分文件。 配置一项 rules 时大致通过以下方式：

* 条件匹配：通过 test 、 include 、 exclude 三个配置项来命中 Loader 要应用规则的文件。
* 应用规则：对选中后的文件通过 use 配置项来应用 Loader，可以只应用一个 Loader 或者按照从后往前的顺序应用一组 Loader，同时还可以分别给 Loader 传入参数。
* 重置顺序：一组 Loader 的执行顺序默认是从右到左执行，通过 enforce 选项可以让其中一个 Loader 的执行顺序放到最前或者最后。


```

const path = require("path");

console.log(path.resolve(__dirname,"../"));
console.log(path.resolve(__dirname,"./"));

module.exports = {

  entry:{module:"./module.js"}, //1.一个入口文件 output也是一个文件
  output:{
    filename:"[name].js",//后两种entry的output
    path:path.resolve(__dirname,'./dist')
  },

  module:{

    rules:[

      {
        test:/\.css$/,
        use:['style-loader','css-loader?minimize']

      },
      {
        test:/\.scss$/,
        // 使用一组 Loader 去处理 SCSS 文件。
        // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
        use:['style-loader','css-loader','sass-loader'], //一定要注意顺序 从后往前执行 sass-loader 最先处理，然后css-loader处理，然后style-loader

        // 只命中src目录里的js文件，加快 Webpack 搜索速度
        include:path.resolve(__dirname,"./"),

        parser:{ //解析
          amd:false
        }
      },
      {
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
        use: ['file-loader'],
        enforce:'pre', //放在最前面
        // 排除 node_modules 目录下的文件
        exclude:path.resolve(__dirname,"../../node_modules") //这个还可以是数组
      }
    ]
  }
}

```