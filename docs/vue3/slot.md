## 插槽slot

### 子组件

```vue
<template>
  // 匿名插槽
  <slot/>
  // 具名插槽
  <slot name='title'/>
  // 作用域插槽
  <slot name="footer" :scope="state" />
</template>

<script setup>
  import { useSlots, reactive } from 'vue'
  const state = reactive({
    name: '张三',
    age: '25岁'
  })
  
  const slots = useSlots()
  // 匿名插槽使用情况
  const defaultSlot = reactive(slots.default && slots.default().length)
  console.log(defaultSlot) // 1
  // 具名插槽使用情况
  const titleSlot = reactive(slots.title && slots.title().length)
  console.log(titleSlot) // 3
</script>

```

### 父组件

```vue
<template>
  <child>
    // 匿名插槽
    <span>我是默认插槽</span>
    // 具名插槽
    <template #title>
      <h1>我是具名插槽</h1>
      <h1>我是具名插槽</h1>
      <h1>我是具名插槽</h1>
    </template>
    // 作用域插槽
    <template #footer="{ scope }">
      <footer>作用域插槽——姓名：{{ scope.name }}，年龄{{ scope.age }}</footer>
    </template>
  </child> 
</template>

<script setup>
  // 引入子组件
  import child from './child.vue'
</script>
```

<Vssue/>