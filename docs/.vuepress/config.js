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
    subSidebar: 'auto',
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
          title: 'vue3文档',
          collapsable: false,
          children: [
            {
              title: '环境搭建',
              path: 'install',
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
      ],
      '/vite/': [
        {
          title: 'vite文档',
          collapsable: false,
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
    '@vuepress/back-to-top',

    //官方图片放大组件 目前是所有img都可以点击放大。具体配置见https://v1.vuepress.vuejs.org/zh/plugin/official/plugin-medium-zoom.html
    ['@vuepress/medium-zoom', { selector: 'img' }],

    // vssue 一个借助issue的评论插件 具体配置见https://vssue.js.org/zh/
    ['@vssue/vuepress-plugin-vssue', {
      // 设置 `platform` 而不是 `api` 我这里是在github平台
      platform: 'github',

      // owner与repo配置 https://github.com/${owner}/${repo}
      // 例如我的仓库地址为https://github.com/1011cat/shotCat_doc 则owner为1011cat，repo为shotCat_doc
      owner: 'your owner',
      repo: 'your repo',

      // 填写自己的OAuth App 信息。详见https://vssue.js.org/zh/options/#repo
      clientId: 'clientId',
      clientSecret: 'clientSecret',
      locale: 'zh', //使用的语言  这里是简体中文
      baseURL: 'https://github.com'
    }] //平台的 base URL
  ]


  // vuepress里修改webpack配置，使用的是chainWebpack进行链式调用
  // 具体使用可以参考我这个例子和 https://github.com/neutrinojs/webpack-chain/tree/v5
  // chainWebpack: (config, isServer) => {
  //   config.resolve.alias
  //     .set('@',resolve('src'))
  // }
};