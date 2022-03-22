## 1.store文件夹的index.js文件下操作vuex分模块管理导入

```js
import { createStore } from 'vuex'
import appStore from './appStore'

export default createStore({
  modules: {
    appStore
  }
})

```

## 2.store/appStore.js文件创建存取需求的操作方法

```js
const appStore = {
    state: {
        totle: 10
    },
    mutations: {
        totleFun(state, value) {
            state.totle = value
        }
    },
    actions: {
        totleFunAdd(context, value) {
            context.commit('totleFun', value + 1)
        },
        totleFunDel(context, value) {
            context.commit('totleFun', value - 1)
        }
    }
}

export default appStore;

```

## 3.views/app.js文件下渲染、存取操作

```vue
<template>
  <div class="app">{{store.state.appStore.totle}}</h1>
    <button @click="add">+值</button> <button @click="del">-值</button>
  </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
	setup() {
		const store = useStore();
		const add = () => {
      		store.dispatch('aFunAdd', store.state.appStore.totle)
    	}
    	const del = () => {
      		store.dispatch('aFunDel', store.state.appStore.totle)
    	}
    	return {
    		add,
    		del,
    		store
    	}
	}
}
</script>

```
::: warning
Vue3 中的Vuex不再提供辅助函数写法
:::

## 4. 更适合vue3的状态库 “Pinia”

*全面拥抱 `Pinia` 吧！ 
 2021年11月24日，尤大在 Twitter 上宣布：`Pinia` 正式成为 Vue 官方的状态库，意味着 `Pinia` 就是 `Vuex 5` ，`Pinia` 的优点： 

- 同时支持 Composition Api 和 Options api 的语法；
- 去掉 mutations ，只有 state 、getters 和 actions ；
- 不支持嵌套的模块，通过组合 store 来代替；
- 更完善的 Typescript 支持；
- 清晰、显式的代码拆分；

### 安装

```javascript
使用 npm
npm install pinia

使用 yarn
yarn add pinia

```

### main.js 引入

```javascript
import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')

```

### 配置 store.js

```javascript
import { defineStore } from 'pinia'

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const useStore = defineStore({
  // id: 必须，在所有 Store 中唯一
  id: 'globalState',
  // state: 返回对象的函数
  state: () => ({
    count: 1,
    data: {
      name: 'Jerry',
      sex: '男'
    }
  }),
  // getter 第一个参数是 state，是当前的状态，也可以使用 this 获取状态
  // getter 中也可以访问其他的 getter，或者是其他的 Store
  getters: {
    // 通过 state 获取状态
    doubleCount: (state) => state.count * 2,
    // 通过 this 获取状态（注意this指向）
    tripleCount() {
      return this.count * 3
    }
  },
  actions: {
    updateData (newData, count) {
      // 使用 this 直接修改
      this.data = { ...newData }
      this.count = count
      
      // 使用 $patch 修改多个值
      this.$patch({
        data: { ...newData },
        count
      })
    }
  }
})

```

### 使用 store

```javascript
<template>
  // 获取 store 的 state
  <p>姓名：{{store.data.name}}</p>
  <p>性别：{{store.data.sex}}</p>
  
  // 调用 mutations 方法 / 修改 store
  <button @click='update'>修改用户信息</button>
  
  // 获取 getter
  <p>获取getter：{{store.doubleCount}}</p>
</template>

<script setup>
  import { useStore } from '@store/store.js'
  const store = useStore()
  
  function update () {
    // 通过 mutations 定义的方法修改 state
    store.updateData({ name: 'Tom', sex: '女' })
    
    // 通过 store 直接修改
    store.data = { name: 'Tom', sex: '女' }
    
    // 同时改变多个状态
    store.$patch((state) => {
      state.data = { name: 'Tom', sex: '女' }
      state.count = 2
    })
  }
</script>

<style lang="scss" scoped>
</style>

```

#### 其他方法

**替换整个 state** 
 `$state` 可以让你通过将 `store` 的属性设置为新对象来替换 `store` 的整个 `state`

```javascript
const store = useStore()
store.$state = {
  name: 'Bob',
  sex: '男'
}

```

**重置状态** 
 调用 `store` 上的 `$reset()` 方法将状态重置为初始值

```javascript
const store = useStore()
store.$reset()
```





















<Vssue/>

