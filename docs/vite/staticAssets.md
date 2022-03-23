## 1. public默认目录更改问题

### 问题原因

`Vite` 默认的静态目录是 `public`，如果需要定义其他目录就无法生效。

### 解决办法

通过 `viteConfig` 的 `publicDir` 参数，将静态目录修改为你需要的目录。

```js

//viteConfig.js

...

publicDir: 'static',

```

## 2. 静态资源引用
::: danger
注意：

1.引入 public 中的资源永远应该使用根绝对路径，例如：public/icon.png 应该在源码中被引用为 /icon.png。

2.public 中的资源不应该被 JavaScript 文件引用。
::: 

### new URL(url, import.meta.url)

[import.meta.url](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import.meta) 是一个 ESM 的原生功能，会暴露当前模块的 URL。将它与原生的 [URL 构造器](https://developer.mozilla.org/en-US/docs/Web/API/URL) 组合使用，在一个 JavaScript 模块中，通过相对路径我们就能得到一个被完整解析的静态资源 URL：

```js
const imgUrl = new URL('./img.png', import.meta.url).href

document.getElementById('hero-img').src = imgUrl
```

这在现代浏览器中能够原生使用 - 实际上，Vite 并不需要在开发阶段处理这些代码！

这个模式同样还可以通过字符串模板支持动态 URL：

```js
function getImageUrl(name) {
  return new URL(`./dir/${name}.png`, import.meta.url).href
}
```

在生产构建时，Vite 才会进行必要的转换保证 URL 在打包和资源哈希后仍指向正确的地址。
::: danger
注意：无法在 SSR 中使用

如果你正在以服务端渲染模式使用 Vite 则此模式不支持，因为 `import.meta.url` 在浏览器和 Node.js 中有不同的语义。服务端的产物也无法预先确定客户端主机 URL。
:::

## 3. 关于在js中引用public目录下文件

在第二点我们可以看到vite是有明确说明：**“public 中的资源不应该被 JavaScript 文件引用。”** 意思就是静态资源不应该在js代码中去使用，那如果在一些开发场景中必须要引用（例如在加载场景和地球资源时候）那么强行使用其实是可以得，但是vite会报错，并且页面也会弹出报错弹窗

### 解决办法

目前只有规避方法并没有实质性解决方法

1. vite.config.js 中修改配置

   ```js
   server: {
         hmr: {
            overlay: false, // 设置成fasle则不会出现错误弹窗
       },
    },
   ```


2. 创建一个和public同一级的文件目录存放静态文件

   但是这里会出现一个问题，vite静态文件目录只有一个，在打包时候也只会将默认的目录打包进去

   那怎么办呢？

   这个时候只能用一个缝补办法，因为静态文件是不会被编译的，所以只需要写一个node脚本在编译完后copy到指定目录就ok了

   例如： 静态文件目录为resources

   ```js
   
   const fs = require('fs');
   const path = require('path');
   
   // eslint-disable-next-line no-shadow
   const isExist = (path) => { // 判断文件夹是否存在, 不存在创建一个
       if (!fs.existsSync(path)) {
           fs.mkdirSync(path);
       }
   };
   
   isExist('dist/resources');
   const copyFile = (sourcePath, targetPath) => {
       const sourceFile = fs.readdirSync(sourcePath, { withFileTypes: true });
   
       sourceFile.forEach((file) => {
           const newSourcePath = path.resolve(sourcePath, file.name);
           const newTargetPath = path.resolve(targetPath, file.name);
           if (file.isDirectory()) {
               isExist(newTargetPath);
               copyFile(newSourcePath, newTargetPath);
           }
           if (file.name.endsWith('.json') || file.name.endsWith('.ext') || file.name.endsWith('.txt') || file.name.endsWith('.png') || file.name.endsWith('.jpg') || file.name.endsWith('.jpeg') || file.name.endsWith('.gif') || file.name.endsWith('.css') || file.name.endsWith('.js') || file.name.endsWith('.bin') || file.name.endsWith('.geojson') || file.name.endsWith('.gltf')) { // 需要复制其他的格式的文件修改 .mp4 既可
               fs.copyFileSync(newSourcePath, newTargetPath);
           }
       });
   };
   
   copyFile('./resources', 'dist/resources');
   
   ```

<Vssue/>