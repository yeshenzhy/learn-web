const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname,'./docs/.vuepress/config.js');

fs.readFile(filePath,'utf8',function(err,data){
  const config = eval('('+data+')');
  const sidebar = config.themeConfig.sidebar;
  const name = `/${process.argv.splice(2)[0]}/`;
  const arr = sidebar[name];
  arr.forEach(item => {
    item.children.forEach(obj => {
      const fileName = obj.path;
      const filePath2 = path.join(__dirname, `./docs/${name}/${fileName}.md`);
      fs.access(filePath2, fs.constants.F_OK, (err) => {
        if (err) {
          // 不存在创建md文件
         fs.writeFile(filePath2,'<Vssue/>',function(err,data){
          });
        }
      });

    })
  })
});