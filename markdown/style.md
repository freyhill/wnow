### 一、安装create-react-app
```
npm install -g create-react-app
```

### 二、创建项目
```
npx create-react-app my-app
```

### 三、安装Antd
```
cd my-app

yarn add antd --save
```

### 四、Antd使用配置
> js中
```
import Button from 'antd/lib/button';


render(){
    return (
        <div>
            <Button type="primary">antd</Button>
        </div>
    )
}
```
> css中
```
@import '~antd/dist/antd.css';
```

### 五、antd高级配置

> react-app-rewired （一个对 create-react-app 进行自定义配置的社区解决方案）
##### 1. 安装 react-app-rewired包
```
yarn add react-app-rewired --save-dev
```
##### 2. 修改package.json 里的启动配置。

```
/* package.json */
"scripts": {
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test --env=jsdom",
+   "test": "react-app-rewired test --env=jsdom",
}
```
##### 3. 然后在项目根目录创建一个 config-overrides.js 用于修改默认配置。

```
module.exports = function override(config, env) {
  // do stuff with the webpack config...
  return config;
};
```
> 到这一步再启动下如果能启动则生效
```
npm start
```
##### 4. 使用 **babel-plugin-import**
> babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件（原理）
- 安装babel-plugin-import包
```
yarn add babel-plugin-import --dev
```
-  修改 **config-overrides.js**
```
+ const { injectBabelPlugin } = require('react-app-rewired');

  module.exports = function override(config, env) {
+   config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
    return config;
  };
```
-  移除css引入
 >css
```
- @import '~antd/dist/antd.css';
```
-  修改js模块儿引入
```
- import Button from 'antd/lib/button';
+ import { Button } from 'antd';
```

-  最后重启运行查看是否生效

### 六、自定义主题
> 自定义主题需要用到 less 变量覆盖功能。我们可以引入 react-app-rewire 的 less 插件 react-app-rewire-less 来帮助加载 less 样式，同时修改 config-overrides.js 文件。

##### 1. 安装less插件
```
yarn add react-app-rewire-less --dev
```
##### 2. 修改 config-overrides.js
```
const { injectBabelPlugin } = require('react-app-rewired');
+ const rewireLess = require('react-app-rewire-less');

  module.exports = function override(config, env) {
-   config = injectBabelPlugin(['import', { libraryName: 'antd', style: 'css' }], config);
+   config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
+   config = rewireLess.withLoaderOptions({
+     javascriptEnabled: true,
+     modifyVars: { "@primary-color": "#1DA57A" },
+   })(config, env);
    return config;
  };
```
##### 3. 重启看按钮是否变色
> 主题修改主要是修改 modifyVars: { "@primary-color": "#1DA57A" },里面内容，可以在[默认样式变量](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less)里找到想要修改的变量加以修改

### 七、使用sass
> 其实create-react-app 就是把我们平常开发安装的一些配置打包了，但基本配置原理不变，所以我们只需要改变webpack的配置就行

##### 1. 安装sass依赖包
```
npm install node-sass 
yarn add  sass-loader  --save-dev
```
##### 2. 在目录``` node_modules/react-scripts/config```下找到 webpack.config.dev.js 文件并在css的loader前添加下面scss的loader
```
{
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader'],
},
```
##### 3.重启查看
```
npm start
```
##### 4. node_modules/react-scripts/config下的webpack.config.prod.js的也要添加scss的loaer 以便编译打包


#### 八、实例demo

* [my-react-app仓库](https://gitee.com/leinov/my-react-app)