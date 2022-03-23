`Vue3`的`setup`语法糖是个好东西，但使用`setup`语法带来的第一个问题就是无法自定义`name`，而我们使用`keep-alive`往往是需要`name`的，解决这个问题通常是通过写两个`script`标签来解决，一个使用`setup`，一个不使用，但这样必然是不够优雅的。

```vue
<script lang="ts">
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'OrderList'
})
</script>

<script lang="ts" setup>
onMounted(() => {
  console.log('mounted===')
})
</script>
```

这时候借助插件`vite-plugin-vue-setup-extend`可以让我们更优雅的解决这个问题，不用写两个`script`标签，可以直接在`script`标签上定义`name`。

安装

```js
npm i vite-plugin-vue-setup-extend -D
```

配置

```js
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

```vue
<script lang="ts" setup name="OrderList">
import { onMounted } from 'vue'

onMounted(() => {
  console.log('mounted===')
})
</script>
```

<Vssue/>