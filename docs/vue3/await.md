## 对 await 的支持
::: tip
不必再配合 async 就可以直接使用 await 了，这种情况下，组件的 setup 会自动变成 async setup 。
:::

```javascript
<script setup>
  const post = await fetch('/api').then(() => {})
</script>
```




<Vssue/>