(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{851:function(t,a,r){t.exports=r.p+"assets/img/liu.34035be4.png"},893:function(t,a,r){"use strict";r.r(a);var s=r(5),e=Object(s.a)({},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"_1-什么是-typescript"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-什么是-typescript"}},[t._v("#")]),t._v(" 1.什么是 TypeScript")]),t._v(" "),s("blockquote",[s("p",[t._v("Typed JavaScript at Any Scale.\n添加了类型系统的 JavaScript，适用于任何规模的项目。")])]),t._v(" "),s("p",[t._v("以上描述是官网["),s("a",{attrs:{href:"https://ts.xcatliu.com/introduction/what-is-typescript.html#link-1",target:"_blank",rel:"noopener noreferrer"}},[t._v("1]"),s("OutboundLink")],1),t._v("对于 TypeScript 的定义。")]),t._v(" "),s("p",[t._v("它强调了 TypeScript 的两个最重要的特性——类型系统、适用于任何规模。")]),t._v(" "),s("h3",{attrs:{id:"类型系统"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#类型系统"}},[t._v("#")]),t._v(" 类型系统")]),t._v(" "),s("p",[t._v("从 TypeScript 的名字就可以看出来，「类型」是其最核心的特性。")]),t._v(" "),s("p",[t._v("我们知道，JavaScript 是一门非常灵活的编程语言：")]),t._v(" "),s("ul",[s("li",[t._v("它没有类型约束，一个变量可能初始化时是字符串，过一会儿又被赋值为数字。")]),t._v(" "),s("li",[t._v("由于隐式类型转换的存在，有的变量的类型很难在运行前就确定。")]),t._v(" "),s("li",[t._v("基于原型的面向对象编程，使得原型上的属性或方法可以在运行时被修改。")]),t._v(" "),s("li",[t._v("函数是 JavaScript 中的一等公民["),s("a",{attrs:{href:"https://ts.xcatliu.com/introduction/what-is-typescript.html#link-2",target:"_blank",rel:"noopener noreferrer"}},[t._v("2]"),s("OutboundLink")],1),t._v("，可以赋值给变量，也可以当作参数或返回值。")])]),t._v(" "),s("p",[t._v("这种灵活性就像一把双刃剑，一方面使得 JavaScript 蓬勃发展，无所不能，从 2013 年开始就一直蝉联最普遍使用的编程语言排行榜冠军["),s("a",{attrs:{href:"https://ts.xcatliu.com/introduction/what-is-typescript.html#link-3",target:"_blank",rel:"noopener noreferrer"}},[t._v("3]"),s("OutboundLink")],1),t._v("；另一方面也使得它的代码质量参差不齐，维护成本高，运行时错误多。")]),t._v(" "),s("p",[t._v("而 TypeScript 的类型系统，在很大程度上弥补了 JavaScript 的缺点。")]),t._v(" "),s("h3",{attrs:{id:"typescript-是静态类型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#typescript-是静态类型"}},[t._v("#")]),t._v(" TypeScript 是静态类型")]),t._v(" "),s("p",[t._v("类型系统按照「类型检查的时机」来分类，可以分为动态类型和静态类型。")]),t._v(" "),s("p",[t._v("动态类型是指在运行时才会进行类型检查，这种语言的类型错误往往会导致运行时错误。JavaScript 是一门解释型语言["),s("a",{attrs:{href:"https://ts.xcatliu.com/introduction/what-is-typescript.html#link-4",target:"_blank",rel:"noopener noreferrer"}},[t._v("4]"),s("OutboundLink")],1),t._v("，没有编译阶段，所以它是动态类型，以下这段代码在运行时才会报错：")]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" foo "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nfoo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("split")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("' '")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Uncaught TypeError: foo.split is not a function")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 运行时会报错（foo.split 不是一个函数），造成线上 bug")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br"),s("span",{staticClass:"line-number"},[t._v("4")]),s("br")])]),s("h2",{attrs:{id:"_2-typescript-与-javascript-的区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-typescript-与-javascript-的区别"}},[t._v("#")]),t._v(" 2.TypeScript 与 JavaScript 的区别")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("TypeScript")]),t._v(" "),s("th",[t._v("JavaScript")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("JavaScript 的超集用于解决大型项目的代码复杂性")]),t._v(" "),s("td",[t._v("一种脚本语言，用于创建动态网页")])]),t._v(" "),s("tr",[s("td",[t._v("可以在编译期间发现并纠正错误")]),t._v(" "),s("td",[t._v("作为一种解释型语言，只能在运行时发现错误")])]),t._v(" "),s("tr",[s("td",[t._v("强类型，支持静态和动态类型")]),t._v(" "),s("td",[t._v("弱类型，没有静态类型选项")])]),t._v(" "),s("tr",[s("td",[t._v("最终被编译成 JavaScript 代码，使浏览器可以理解")]),t._v(" "),s("td",[t._v("可以直接在浏览器中使用")])]),t._v(" "),s("tr",[s("td",[t._v("支持模块、泛型和接口")]),t._v(" "),s("td",[t._v("不支持模块，泛型或接口")])]),t._v(" "),s("tr",[s("td",[t._v("社区的支持仍在增长，而且还不是很大")]),t._v(" "),s("td",[t._v("大量的社区支持以及大量文档和解决问题的支持")])])])]),t._v(" "),s("h2",{attrs:{id:"_3-典型-typescript-工作流程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-典型-typescript-工作流程"}},[t._v("#")]),t._v(" 3.典型 TypeScript 工作流程")]),t._v(" "),s("p",[s("img",{attrs:{src:r(851),alt:"img"}})]),t._v(" "),s("p",[t._v("如你所见，在上图中包含 3 个 ts 文件：a.ts、b.ts 和 c.ts。这些文件将被 TypeScript 编译器，根据配置的编译选项编译成 3 个 js 文件，即 a.js、b.js 和 c.js。对于大多数使用 TypeScript 开发的 Web 项目，我们还会对编译生成的 js 文件进行打包处理，然后在进行部署。")]),t._v(" "),s("Vssue")],1)},[],!1,null,null,null);a.default=e.exports}}]);