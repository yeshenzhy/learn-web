## Node相关问题
## 1.Uncaught ReferenceError: require is not defined

### 问题原因
这个问题应该是出现最多的一个问题了，原因在于 `Vite` 是完全依靠 `ESM` 原生能力的，也就是他只认识 `import` ，因为 `Vite` 依赖 `script` 的 `module` 属性。我们的代码最终都会被送到浏览器里执行，`require` 是 `cjs` 的关键词，浏览器环境本身就没定义这个方法，自然就报错了。这里和 `webpack` 不一样，`webpack` 把文件送到浏览器之前是会进行预打包的，这时候已经将 `require` 转换成 浏览器能兼容的方法了。

### 解决办法
目前没有特别好的办法，如果是自己写的模块里有用 `require` 关键词的，需要替换成 `import` ，但如果是第三方模块的话，如果包里面用到了 `require` 可能就无解了，目前项目中遇到的包包括 `react-intl` 、`bizcharts`等，如果大家项目中也用到了这些，可以尝试找替换包。
> 顺便一提，`antd`的样式导入不能用 `css.js` 导入，因为里面有用到 `require` 关键词引 `less` 文件，浏览器运行也会出错。
## 2.Node 相关方法都无法使用

### 问题原因

也是因为直接送到浏览器的原因，没有预先做过处理，像 **process** 、**event** 这些 `node` 对象都无法在浏览器里找到定义。

### 解决办法

可以用社区的兼容浏览器的包进行 **polyfill**，目前作者项目中主要用到 **process** 、**event**，**process** 可以用 [process-es6](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fcalvinmetcalf%2Fnode-process-es6) 做兼容。

```js
import process from 'process-es6/browser.js'
//浏览器里赋值给 window
global.process = process

```

**event** 可以通过 [events](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fbrowserify%2Fevents) 做兼容，装完就可以了，不需要额外配置。

## 3. xxx does not provide an export named 'xxx'

### 问题原因

大部分第三方包都是 `cjs` 导出的，也就是只有一个导出口，比如 `axios` 、`jquery`、`lodash`等，他们的导出方式类似下面这样。

```js
module.exports = require('./xxx');

```

显然，这并不能被 `Vite` 识别，因为 `Vite` 只支持 `ESM` 的导出方式，这部分第三方包需要做个兼容。

### 解决办法

好在官方已经提供了解决办法，参考这次 [issue](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Fissues%2F813) 。`viteConfig` 里提供了 `optimizeDeps` 参数，专门来处理这些 `cjs` 导出的包，使他变为 `ESM` 导出，像这样。

```js
//viteConfig.js
  ...
  optimizeDeps: {
    include: ['axios','jquery','lodash']
  },

```

加完之后，错误消除。

## 4. Failed to resolve entry for package 'xxx'
### 问题原因

部分第三方包在 `package.json` 里的导出位置是错误的，导致 `Vite` 查找的时候出现了错误。

### 解决办法

通过 `viteConfig` 的 `resolve` 参数，强制将路径换成正确的地址。

```js
//viteConfig.js
...
resolve: {
    alias: [
      {
        find: 'intl-locales-supported',
        replacement: path.resolve('node_modules/intl-locales-supported/src/index.ts')
      }
   ]
 }  

```

## 5. alias '@' to path.resolve(__dirname, './src') is not working

### 问题原因

由于 `Vite` 本身已经用了 **@** 去做模块导入工作，如果用 **@** 别名当绝对路径去使用会有问题

### 解决办法

通过多加一个 **/** 来规避 **@** 冲突的问题，具体见这次[issue](https://github.com/vitejs/vite/issues/279#issuecomment-635646269)

```js
// vite.config.js
module.exports = {
  alias: {
    '/@/': path.resolve(__dirname, './src')
  }
}

```

## 6. 兼容性

`Vite` 默认是用的浏览器原生的导模块能力，也就意味着，他需要现代浏览器的支持。以下是最低支持的浏览器版本

```js
Chrome >=61
Firefox >=60
Safari >=11
Edge >=16

```

也就是说，这些版本以下的都是不支持 `module` 属性的，好在我们项目不需要兼容古老的浏览器，像 `IE` 各种版本，都不需要支持，这也是为啥我们敢重构的原因之一。

当然，官方也提供了低浏览器版本的解决方案，[@vitejs/plugin-legacy](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvitejs%2Fvite%2Ftree%2Fmain%2Fpackages%2Fplugin-legacy)，这个插件可以让 `Vite` 打包的项目在老的浏览器里面运行，主要用  `@babel/preset-env` 来进行转换，不过用了之后，打包速度会明显变慢，这点看取舍了。

<Vssue/>