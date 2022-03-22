## v-bind() CSS变量注入

```javascript
<template>
  <span>Jerry</span>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  // prop接收样式
  const props = defineProps({
    border: {
      type: String,
      default: '1px solid yellow'
    }
  })
  
  // 常量声明样式
  const background = 'red'
  
  // 响应式数据声明样式
  const color = ref('blue')
  const style = reactive({
    opacity: '0.8'
  })
</script>

<style lang="scss" scoped>
  span {
    // 使用常量声明的样式
    background: v-bind(background);
    
    // 使用响应式数据声明的样式
    color: v-bind(color);
    opacity: v-bind('state.opacity');
    
    // 使用prop接收的样式
    border: v-bind('props.border');
  }
</style>
```



<Vssue/>