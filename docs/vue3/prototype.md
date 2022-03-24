## 原型绑定与组件内使用

### main.js

```javascript
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

// 获取原型
const prototype = app.config.globalProperties

// 绑定参数
prototype.name = 'Jerry'

```

### 组件内使用

```javascript
<script setup>
  import { getCurrentInstance } from 'vue'

  // 获取原型
  const { proxy } = getCurrentInstance()
  
  // 输出
  console.log(proxy.name)
</script>
```



<Vssue/>