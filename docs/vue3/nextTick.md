## Vue3中获取单个dom

在vue2中可以使用this.$refs获取一个dom或者多个dom, 但在vue3中获取dom和vue2有些不同

setup相当于create, 此时页面还没有初始化, 因此在nextTick中获取dom

```vue
<template>
  <div>
    <div ref="name">张三</div>
  </div>
</template>

<script lang="ts">
import { defineComponent,nextTick ,ref} from 'vue';

export default defineComponent({
  name: '',
  setup() {
      let name = ref<any>('')
      nextTick(()=>{
        console.log(name.value,'dom');
        console.log(name.value.innerHTML,'内容');
      })
      return {
        name
      }
  }
});
</script>

<style scoped>

</style>
```

## vue3中获取多个dom, 获取多个dom得用方法

```vue
<div :ref="getFruit">香蕉</div>
<div :ref="getFruit">梨子</div>
<div :ref="getFruit">菠萝</div>
    
      setup() {
      let name = ref<any>('')
      nextTick(()=>{
        console.log(name.value,'dom');
        console.log(name.value.innerHTML,'内容');
      })
      let getFruit = (e:any) =>{
        console.log(e);
      }
      return {
        name,
        getFruit
      }
  }

```

## 需要在nextTick中获取dom

```js
let name = ref<any>('')
      let fruitArr:any[] = []
      let getFruit = (el:any) =>{
        fruitArr.push(el)
      }
       nextTick(()=>{
        console.log(name.value,'dom');
        console.log(name.value.innerHTML,'内容');
        console.log(fruitArr,'fruitArr数据..'); 
      })

```


## 在vue3中, 用vue2的方式获取dom

```js
在setup后接着写生命周期方法就好了
 mounted () {
    console.log((this as any).$refs['name'].innerHTML,'vue2中mouted');
  }

```


<Vssue/>