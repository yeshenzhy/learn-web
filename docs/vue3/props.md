## props父传子

### 子组件

```vue
<template>
  <span>{{props.name}}</span>
  // 可省略【props.】
  <span>{{name}}</span>
</template>

<script setup>
  // import { defineProps } from 'vue'
  // defineProps在<script setup>中自动可用，无需导入
  // 需在.eslintrc.js文件中【globals】下配置【defineProps: true】

  // 声明props
  const props = defineProps({
    name: {
      type: String,
      default: ''
    }
  })  
</script>
```

### 父组件

引入子组件，组件会自动注册

```vue
<template>
  <child name='Jerry'/>  
</template>

<script setup>
  // 引入子组件
  import child from './child.vue'
</script>
```






<Vssue/>