## 1. 监听普通类型

toRefs 转换响应式对象中所有属性为单独响应式数据

> 🔔 Vue3中控制台打印的时候，看到 Proxy 或者 ref 都表示响应式数据，改变数据会同步到视图。

🔔 ref 可以让基本类型数据也变成响应式

```js
import { ref, watch } from 'vue'

setup() {
    const number = ref(0)
    
    // 监听 number 变量，如果有发生变化，自动运行后面的回调函数
    watch(number, (newVal, oldVal) => {
      console.log({ newVal, oldVal })
    })
    return { number }
  }

```

- toRef是函数，转换**响应式对象**中**某个**属性为单独响应式数据，并且**值是关联的**。
- toRefs是函数，转换**响应式对象**中所有属性为单独响应式数据，对象成为普通对象，并且**值是关联的**

## 2. 监听响应式对象

- reactive是一个函数，它可以定义一个复杂数据类型，成为响应式数据。

> 💥reactive 不能让基本类型数据变成响应式

```js
    // 定义响应式对象数据
    const obj = reactive({
      name: '小象',
      age: 18,
    })
   
// 修改名字的函数
    const btn = () => {
      obj.name = '大象'
      console.log('obj变了吗', obj)
    }

```

## 3. 监听多个参数

```js
import { ref, watch } from 'vue'
setup() {
    const number = ref(0)
    const msg = ref('你好')
    
    // 监听 number 变量，如果有发生变化，自动运行后面的回调函数
    // 监听 [number, msg] 多个响应式数据数据，其中一个数据发生变化，就会触发 watch 回调函数
    watch([number, msg], (newVal, oldVal) => {
      console.log({ newVal, oldVal })
    })
    return { number, msg }
  }

```

## 4. 深度监听和立即执行

> 💥 { deep: true , immediate: true }

```js
    // 定义响应式对象数据
    const obj = reactive({
      name: '小象',
      age: 18,
      cp: {
        name: '小花',
        age: 16,
      },
    })

    // 监听 reactive 定义的响应式数据
    //   特点1：newVal === oldVal，根本就是同一个内容地址，就是对象本身
    //   特点2：reactive() 对象默认是深度监听，能监听到所有的子属性的变化
    
    // 注意点：
    //   💥 如果监听的属性值是基本类型数据，需要写成函数返回该属性的方式才能监听到

    watch(
      () => obj.cp,
      val => {
        console.log('小象找到CP了要发红包', val)
      },
      { deep: true , immediate: true }
    )
```


::: warning
- 与Vue2.x中watch配置功能一致

- 两个小“坑”：

  - 监视reactive定义的响应式数据时：oldValue无法正确获取、强制开启了深度监视（deep配置失效）。
  - 监视reactive定义的响应式数据中某个属性时：deep配置有效。
  :::
  ```js
  //情况一：监视ref定义的响应式数据
  watch(sum,(newValue,oldValue)=>{
   console.log('sum变化了',newValue,oldValue)
  },{immediate:true})
  
  //情况二：监视多个ref定义的响应式数据
  watch([sum,msg],(newValue,oldValue)=>{
   console.log('sum或msg变化了',newValue,oldValue)
  }) 
  
  /* 情况三：监视reactive定义的响应式数据
   若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue！！
   若watch监视的是reactive定义的响应式数据，则强制开启了深度监视 
  */
  watch(person,(newValue,oldValue)=>{
   console.log('person变化了',newValue,oldValue)
  },{immediate:true,deep:false}) //此处的deep配置不再奏效
  
  //情况四：监视reactive定义的响应式数据中的某个属性
  watch(()=>person.job,(newValue,oldValue)=>{
   console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true}) 
  
  //情况五：监视reactive定义的响应式数据中的某些属性
  watch([()=>person.job,()=>person.name],(newValue,oldValue)=>{
   console.log('person的job变化了',newValue,oldValue)
  },{immediate:true,deep:true})
  
  //特殊情况
  watch(()=>person.job,(newValue,oldValue)=>{
      console.log('person的job变化了',newValue,oldValue)
  },{deep:true}) //此处由于监视的是reactive素定义的对象中的某个属性，所以deep配置有效
  ```

## 5. watchEffect函数

- watch的套路是：既要指明监视的属性，也要指明监视的回调。

- watchEffect的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

- watchEffect有点像computed：

  - 但computed注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而watchEffect更注重的是过程（回调函数的函数体），所以不用写返回值。

  ```js
  //watchEffect所指定的回调中用到的数据只要发生变化，则直接重新执行回调。
  watchEffect(()=>{
      const x1 = sum.value
      const x2 = person.age
      console.log('watchEffect配置的回调执行了')
  })
  ```

## 6.watchEffect进阶使用

### 1.停止监听

当 `watchEffect` 在组件的 [setup()](https://v3.cn.vuejs.org/guide/composition-api-setup.html) 函数或[生命周期钩子](https://v3.cn.vuejs.org/guide/composition-api-lifecycle-hooks.html)被调用时，侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止。

在一些情况下，也可以显式调用返回值以停止侦听：

```js
const stop = watchEffect(() => {
  /* ... */
})

// later
stop()
```

### 2.清除副作用（onInvalidate）

有时副作用函数会执行一些异步的副作用，这些响应需要在其失效时清除 (即完成之前状态已改变了) 。所以侦听副作用传入的函数可以接收一个 `onInvalidate` 函数作入参，用来注册清理失效时的回调。当以下情况发生时，这个失效回调会被触发：

- 副作用即将重新执行时
- 侦听器被停止 (如果在 `setup()` 或生命周期钩子函数中使用了 `watchEffect`，则在组件卸载时)

```js
watchEffect(onInvalidate => {
  const token = performAsyncOperation(id.value)
  onInvalidate(() => {
    // id has changed or watcher is stopped.
    // invalidate previously pending async operation
    token.cancel()
  })
})

```

我们之所以是通过传入一个函数去注册失效回调，而不是从回调返回它，是因为返回值对于异步错误处理很重要。

在执行数据请求时，**副作用函数**往往是一个**异步函数**：

```js
const data = ref(null)
watchEffect(async onInvalidate => {
  onInvalidate(() => {
    /* ... */
  }) // 我们在Promise解析之前注册清除函数
  data.value = await fetchData(props.id)
})

```

我们知道异步函数都会隐式地返回一个 Promise，但是清理函数必须要在 Promise 被 resolve 之前被注册。另外，Vue 依赖这个返回的 Promise 来自动处理 Promise 链上的潜在错误。

### 3.watch和watchEffect的区别

1.watch可以访问新值和旧值，watchEffect不能访问。

2.watchEffect有副作用，**DOM挂载或者更新之前就会触发**，需要我们自己去清除副作用。

3.watch是**惰性执行**，也就是只有监听的值发生变化的时候才会执行，但是watchEffect不同，每次代码**加载**watchEffect都会执行。

4.watch需要指明监听的对象，也需要指明监听的回调。watchEffect不用指明监视哪一个属性,监视的回调函数中用到哪个属性,就监视哪个属性。







<Vssue/>