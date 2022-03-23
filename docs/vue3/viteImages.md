<!--
 * @Descripttion: 
 * @Author: zhy
 * @Date: 2022-03-23 11:01:22
 * @LastEditTime: 2022-03-23 11:56:58
-->
在`Vue2`时我们经常会这样引用图片：

```js
<img :src="require('@/assets/image/logo.png')" />
```

但在`Vite`中不支持`require`了，引用图片变成了下面这样：

```vue
<template>
  <img :src="Logo" />
</template>

<script lang="ts" setup>
import Logo from '@/assets/image/logo.png'
</script>
```

每次使用图片都得`import`，显然耽误了大家摸鱼的时间，这时我们可以借助`vite-plugin-vue-images`来实现自动导入图片。

安装

```js
npm i vite-plugin-vue-images -D
```

配置

```js
// vite.config.ts
import { defineConfig } from 'vite'
import ViteImages from 'vite-plugin-vue-images'

export default defineConfig({
  plugins: [
    ViteImages({
      dirs: ['src/assets/image'] // 指明图片存放目录
    })
  ]
})
```

使用

```vue
<template>
  <!-- 直接使用 -->
  <img :src="Logo" />
</template>

<script lang="ts" setup>
// import Logo from '@/assets/image/logo.png'
</script>
```

<Vssue/>