## 1. Partial`<T>`

将泛型传入的T中所有属性转换为可选属性，返回的类型可以是T的任意子集。

```ts
interface Person {
  name: string,
  age: number
}

// 相当于type Person1 = { name?: string; age?: number; }
type Person1 = Partial<Person> 

const p: Person = {
  name: 'lin',
  age: 18
}

const p1: Person1 = {
  name: 'lin'
}
```

**源码：**

```ts
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

keyof T 获取T中的key值组合，这里的例子T是Person相当于是'name' | 'age', in关键字遍历keyof返回值为新的类型新增了name和age属性，？操作符将所有属性定义为可选属性。

## 2. Required `<T>`

将泛型传入的T中所有属性转换为必须属性，和Partial类型相反。

```ts
interface Person {
  name?: string,
  age?: number
}

type Person1 = Required<Person> // 相当于type Person1 = { name: string; age: number; }

const p: Person = {
  name: 'lin'
}

// 错误提示：类型 "{ name: string; }" 中缺少属性 "age"，但类型 "Required<Person>" 中需要该属性。
const p1: Person1 = {
  name: 'lin'
}
```

**源码：**

```ts
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

和Partial相反，通过-？操作符将所以可选属性去除。

## 3. Readonly`<T>`

将泛型传入的T中所有属性转换为只读属性。

```ts
interface Person {
  name: string
}

type Person1 = Readonly<Person> // 相当于type Person1 = { readonly name: string; }

const p: Person1 = {
  name: 'lin'
}

// 提示错误： 无法分配到 "name" ，因为它是只读属性。
p.name = 'zhen'
```

**源码：**

```ts
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

使用readonly关键字将所有属性变成只读属性。

## 4. Record`<K, T>`

创建一个对象类型，使对象的键key的类型为传入的泛型K，使对象的值value的类型为传入的泛型T。

```ts
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

// boris类型为：CatInfo
cats.boris;
```

**源码：**

```ts
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

## 5. Pick`<T, K>`

通过传入的泛型T中选择一组属性K(字符串字面值或字符串字面值的联合)来构造类型。

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

// 相当于type TodoPreview = { title: string; completed: boolean; }
type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

**源码：**

```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

规定了泛型K必须是泛型T中key的子集，上面例子中K必须是‘title’｜‘description’｜‘completed’

## 6. Omit`<T,K>`

通过传入的泛型T中选择一组属性K并删除其他属性，和Pick相反。

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
// 相当于 type TodoPreview = { title: string; completed: boolean; createdAt: number; }
type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};
```

**源码：**

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

结合了Pick和Exclude，使用Exclude排除掉T中除了包含K的所有属性，使用Pick重新创建一个新的类型。

## 7. Parameters`<T>`

从函数类型T的形参中使用的类型构造元组类型，可以用来获取一个函数里面参数的类型，不过注意是用元组的形式获取。

```ts
const fn = (a: string, b: number): void => {}

const fn1 = <T>(arg: T): T => arg

// type p1 = [a: string, b: number
type p1 = Parameters<typeof fn>

// type p2 = [arg: unknown]
type p2 = Parameters<typeof fn1>

// type p3 = unknown[]
type p3 = Parameters<any>

// type p4 = never
type p4 = Parameters<never>

// 类型“string”不满足约束“(...args: any) => any”。
// 泛型必须传入的是函数的类型定义
type p5 = Parameters<'lin'>
```

**源码：**

```ts
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

## 8. ReturnType`<T>`

获取函数类型T返回值的类型。

```ts
const fn = () => {
  return {
    name: 'lin',
    age: 18
  }
}

const fn1 = () => {
  return [18, 'lin']
}

// type r1 = { name: string; age: number; }
type r1 = ReturnType<typeof fn>

// type r2 = (string | number)[]
type r2= ReturnType<typeof fn1>

// type r3 = any
type r3 = ReturnType<any>

// type r4 = never
type r4 = ReturnType<never>

// 类型“string”不满足约束“(...args: any) => any”。
// 泛型必须传入的是函数的类型定义
type r5 = ReturnType<'lin'>
```

**源码：**

```ts
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : a
```



<Vssue/>