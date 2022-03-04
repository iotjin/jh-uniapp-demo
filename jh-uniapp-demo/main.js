import Vue from 'vue'
import App from './App'



Vue.config.productionTip = false

App.mpType = 'app'

// uView
import uView from "uview-ui";
Vue.use(uView);

const app = new Vue({
	...App
})
app.$mount()

/*

npm list

1. npm安装模块
【npm install xxx】利用 npm 安装xxx模块到当前命令行所在目录；
【npm install -g xxx】利用npm安装全局模块xxx；

2. 本地安装
本地安装时将模块写入package.json中：
【npm install xxx】安装但不写入package.json；
【npm install xxx --save】 安装并写入package.json的"dependencies"中；
【npm install xxx --save-dev】安装并写入package.json的"devDependencies"中。

3. npm 删除模块
【npm uninstall xxx】删除xxx模块；
【npm uninstall -g xxx】删除全局模块xxx；



更新：

npm list //命令查询现在系统安装的版本

npm view uview-ui versions  //命令查询服务器现在有的版本

npm uninstall uview-ui  //移除现在系统安装的版本


*/
