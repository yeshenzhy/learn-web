## 定义组件的name

# 1. name 的作用

组件中的name到底有什么作用呢,让我们来了解一下:

## 1.1. 当使用keep-alive时，可以使用这个name进行过滤

```vue
<div id="app"> 
  <keep-alive exclude="Home">
    <router-view/>
  </keep-alive>
</div>
```

## 1.2. 递归组件（组件自己调用自己）中迭代时需要调用自身的name

TreeMenu.vue

```vue
<template>
  <ul>
    <li v-for="(item,index) in menuData" :key="index">
      <p>{{item.name}}</p>
      <TreeMenu :menuData="item.children"></TreeMenu>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'TreeMenu',
  props: { menuData: Array }
}
</script>
```

## 1.3. vue-tools调试时，如果使用设置了name属性，那么控制台里显示的是设置的名字，否则显示组件名

# 2. 如何在setup语法糖中加入name呢

## 2.1 可以再加个平级的 script 标签，在里面实现即可。

```vue
<script setup></script>
<script>
export default {
name:''
}
</script>
```

## 2.2 借助插件**vite-plugin-vue-setup-extend**可以让我们更优雅的解决这个问题，不用写两个script标签，可以直接在script标签上定义name。

安装

```js
npm i vite-plugin-vue-setup-extend -D

```

配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
  plugins: [
    VueSetupExtend()
  ]
})

```

使用

```js
<script lang="ts" setup name="OrderList">
//...
</script>
```





<Vssue/>