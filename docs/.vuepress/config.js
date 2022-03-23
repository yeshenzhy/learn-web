// 很多时候，我们引入自己的组件库，路径是不对的，
//这时就需要引入path，并在后面的chainWebpack进行配置
// const path = require('path')
// function resolve (dir) {
//   return path.join(__dirname, '../../', dir)
// }


// -------------------！！！重要！！！！-----------------
// 为了更好的理解，以下所有配置，注释，须配合查看页面实际效果！

module.exports = {
  title: '前端技术文档', //标题
  description: '在这里你可能会发现新的大陆', //描述
  base: '/learn-web/', //基本url
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }], // 增加一个自定义的 favicon
  ],
  // dest: './dist', //打包位置
  port: 6868, //端口号 谐音流弊流弊
  //主题配置
  themeConfig: {
    //顶部导航栏配置
    subSidebar: 'auto', // 配置则会在右侧生成导航
    nav: [
      { text: '主页', link: '/' },  // 内部链接 以docs为根目录
      {
        text: 'API文档',
        items: [
          { text: 'Vue3文档', link: '/vue3/install' },
          { text: 'Vite文档', link: '/vite/introduction' },
          { text: 'TypeScript文档', link: 'https://www.tslang.cn/index.html' },
          { text: 'ThingJs文档', link: 'http://docs.thingjs.com/' }
        ]
      },
      {
        text: '快捷导航',
        items: [
          { text: 'Vue3官网', link: 'https://v3.cn.vuejs.org/' },
          { text: 'Vite官网', link: 'https://vitejs.cn/' },
          { text: 'TypeScript官网', link: 'https://www.tslang.cn/index.html' },
          { text: 'ThingJs官网', link: 'http://docs.thingjs.com/' }
        ]
      }
    ],
    // 这里使用的是多个侧边栏设置
    sidebar: {
      '/vue3/': [
        {
          title: 'vue3 Api文档',
          collapsable: false,
          children: [
            {
              title: '环境搭建',
              path: 'install',
              collapsable: false,
            },
            {
              title: '生命周期',
              path: 'lifeCycle',
              collapsable: false,
            },
            {
              title: '文件结构',
              path: 'fileStructure',
              collapsable: false,
            },
            {
              title: 'data',
              path: 'data',
              collapsable: false,
            },
            {
              title: 'method方法',
              path: 'method',
              collapsable: false,
            },
            {
              title: 'computed计算属性',
              path: 'computed',
              collapsable: false,
            },
            {
              title: 'watch监听函数',
              path: 'watch',
              collapsable: false,
            },
            {
              title: 'props父传子',
              path: 'props',
              collapsable: false,
            },
            {
              title: 'emit传父',
              path: 'emit',
              collapsable: false,
            },
            {
              title: 'v-model',
              path: 'vModel',
              collapsable: false,
            },
            {
              title: 'nextTick',
              path: 'nextTick',
              collapsable: false,
            },
            {
              title: '子组件ref变量和defineExpose',
              path: 'refDefineExpose',
              collapsable: false,
            },
            {
              title: 'slot插槽',
              path: 'slot',
              collapsable: false,
            },
            {
              title: 'useRoute和useRouter',
              path: 'router',
              collapsable: false,
            },
            {
              title: '路由导航守卫',
              path: 'navigationGuard',
              collapsable: false,
            },
            {
              title: 'store',
              path: 'store',
              collapsable: false,
            },
            {
              title: '原型绑定与组件内使用',
              path: 'prototype',
              collapsable: false,
            },
            {
              title: 'v-bind() CSS变量注入',
              path: 'vBind',
              collapsable: false,
            },
            {
              title: 'provide和inject',
              path: 'provideInject',
              collapsable: false,
            },
            {
              title: '对 await 的支持',
              path: 'await',
              collapsable: false,
            },
            {
              title: '其它Composition API',
              path: 'otherApi',
              collapsable: false,
            },
            {
              title: '定义组件的name',
              path: 'componentName',
              collapsable: false,
            },
          ]
        },
        {
          title: 'vue3 好用的神器',
          collapsable: false,
          children: [
            {
              title: 'setup name 增强',
              path: 'setupName',
              collapsable: false,
            },
            {
              title: 'API 自动导入',
              path: 'autoImport',
              collapsable: false,
            },
            {
              title: '自动导入图片',
              path: 'viteImages',
              collapsable: false,
            },
          ]
        }
      ],
      '/vite/': [
        {
          title: 'vite文档',
          collapsable: true,
          children: [
            {
              title: '简介',
              path: 'introduction',
              collapsable: false,
            },
            {
              title: '快速上手',
              path: 'quickStart',
              collapsable: false,
            },
            {
              title: '几点说明',
              path: 'tips',
              collapsable: false,
            }
          ]
        }
      ]
    },
    sidebarDepth: 1, // 将同时提取markdown中h2，显示在侧边栏上
    lastUpdated: '最后更新于' // 文档更新时间：每个文件git最后提交的时间
  },

  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  plugins: [
    // 官方回到顶部插件
    '@vuepress-reco/vuepress-plugin-back-to-top',
    // 代码扩展
    '@vuepress-reco/extract-code',
    //官方图片放大组件 目前是所有img都可以点击放大。具体配置见https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-medium-zoom.html
    ['@vuepress/medium-zoom', { selector: '.theme-reco-content :not(a) > img' }],
    // vssue 一个借助issue的评论插件 具体配置见https://vssue.js.org/zh/
    ['@vssue/vuepress-plugin-vssue', {
      // 设置 `platform` 而不是 `api` 我这里是在github平台
      platform: 'github-v4',
      // owner与repo配置 https://github.com/${owner}/${repo}
      // 例如我的仓库地址为https://github.com/1011cat/shotCat_doc 则owner为1011cat，repo为shotCat_doc
      owner: 'yeshenzhy',
      repo: 'learn-web',
      autoCreateIssue: true,
      // 填写自己的OAuth App 信息。详见https://vssue.js.org/zh/options/#repo
      clientId: '06a5342747e0e574df62',
      clientSecret: '28d7f5d3d6fbc1405a3c57a833b061b32e1f7d4f',
      locale: 'zh', //使用的语言  这里是简体中文
      baseURL: 'https://github.com'
    }], //平台的 base URL
    // 代码复制
    ["vuepress-plugin-nuggets-style-copy", {
      copyText: "复制代码",
      tip: {
          content: "复制成功"
      }
   }],
  //  看板娘
   [
    '@vuepress-reco/vuepress-plugin-kan-ban-niang',
    {
      theme: ['miku', 'blackCat', 'whiteCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'wanko', 'miku', 'z16'],
      clean: false,
      modelStyle: {
        position: "fixed",
        right: "65px",
        bottom: "0px",
        zIndex: 99999,
        messages:  {
          welcome: '欢迎来到夜神丶的前端技术文档',
          home: '心里的花，我想要带你回家。',
          theme: '好吧，希望你能喜欢我的其他小伙伴。',
          close: '你知道我喜欢吃什么吗？痴痴地望着你。'
        }
      }
    }
  ],
  // 鼠标光效
  ['cursor-effects', {
    size: 2, // size of the particle, default: 2
    shape: 'star', // ['star' | 'circle'], // shape of the particle, default: 'star'
    zIndex: 999999999, // z-index property of the canvas, default: 999999999
	}],
  // 背景音乐
  [
    '@vuepress-reco/vuepress-plugin-bgm-player',
    {
      audios: [
        {
          name: '강남역 4번 출구',
          artist: 'Plastic / Fallin` Dild',
          url: 'https://assets.smallsunnyfox.com/music/2.mp3',
          cover: 'https://assets.smallsunnyfox.com/music/2.jpg'
        },
        {
          name: '用胳膊当枕头',
          artist: '최낙타',
          url: 'https://assets.smallsunnyfox.com/music/3.mp3',
          cover: 'https://assets.smallsunnyfox.com/music/3.jpg'
        }
      ] ,
      // 是否默认缩小
      autoShrink: true ,
      // 缩小时缩为哪种模式
      shrinkMode: 'float',
      // 悬浮窗样式
      floatStyle:{ bottom: '10px', 'z-index': '999999' }
    }
  ],
  // 动态标题显示
  ['dynamic-title', {
    showText: '客官欢迎回来~',
    hideText: '客官不要走嘛~',
    recoverTime: 2000,
 }]
  ]


  // vuepress里修改webpack配置，使用的是chainWebpack进行链式调用
  // 具体使用可以参考我这个例子和 https://github.com/neutrinojs/webpack-chain/tree/v5
  // chainWebpack: (config, isServer) => {
  //   config.resolve.alias
  //     .set('@',resolve('src'))
  // }
}