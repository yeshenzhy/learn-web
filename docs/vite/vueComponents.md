## vue全局组件注册问题

在用webpack打包我们一次性注册全局组件是这样的

```js
// 首字母大写，返回整个字符串
function changeStr(str) {
    return str[0].toUpperCase() + str.slice(1);
}
// 通过webpack的API
// false 是否匹配同级下的子目录，查找vue结尾的文件
const requireComponent = require.context('./', false, /\.vue$/);

// 返回当前目录文件下带vue的文件
const install = (Vue) => {
    requireComponent.keys().forEach((fileName) => {
        // 获取第i个组件
        const config = requireComponent(fileName);
        // 获取组件名字
        const componentName = changeStr(
            fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''),
        );

        Vue.component(componentName, config.default || config);
    });
};
export default {
    install,
};

```

很显然node 的require已经不能用了

那么vite的环境变量是：

Vite 在一个特殊的 **import.meta.env** 对象上暴露环境变量。这里有一些在所有情况下都可以使用的内建变量：

- **import.meta.env.MODE**: {string} 应用运行的[模式](https://vitejs.cn/guide/env-and-mode.html#modes)。
- **import.meta.env.BASE_URL**: {string} 部署应用时的基本 URL。他由[`base` 配置项](https://vitejs.cn/config/#base)决定。
- **import.meta.env.PROD**: {boolean} 应用是否运行在生产环境。
- **import.meta.env.DEV**: {boolean} 应用是否运行在开发环境 (永远与 `import.meta.env.PROD`相反)。



## `.env` 文件

Vite 使用 [dotenv](https://github.com/motdotla/dotenv) 从你的 [环境目录](https://vitejs.cn/config/#envdir) 中的下列文件加载额外的环境变量：

```js
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

加载的环境变量也会通过 `import.meta.env` 暴露给客户端源码。

为了防止意外地将一些环境变量泄漏到客户端，只有以 `VITE_` 为前缀的变量才会暴露给经过 vite 处理的代码。例如下面这个文件中：

```
DB_PASSWORD=foobar
VITE_SOME_KEY=123
```

只有 `VITE_SOME_KEY` 会被暴露为 `import.meta.env.VITE_SOME_KEY` 提供给客户端源码，而 `DB_PASSWORD` 则不会。



所以最终改为

```js
function getComName(str) {
    const reg = /(.*)?\/([a-zA-Z0-9]+)\.vue/;
    return str.replace(reg, '$2');
}

// 返回当前目录文件下带vue的文件
const files = import.meta.globEager('/src/components/*.vue');

export default (app) => {
    Object.keys(files).forEach((com) => {
        const component = files[com]?.default;
        const componentName = getComName(com);
        // 挂载全局控件
        app.component(componentName, component);
    });
};
```

<Vssue/>