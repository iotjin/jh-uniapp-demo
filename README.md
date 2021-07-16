# jh-uniapp-demo

A new uniapp project - 实现一些常用效果、封装通用组件和工具类 <br>
<br>

代码不定期更新
<br>

<br>

## 项目结构

```
├── common
│   ├── configs
│   ├── libs
│   ├── style
│   └── utils
├── components
├── dataManager
│   └── userDataManager.js
├── http
│   ├── apiConfig.js
│   └── httpUtils.js
├── hybrid
│   └── html
├── node_modules
│   └── uview-ui
├── pages
│   ├── index
│   ├── login
│   ├── module1
│   ├── module2
│   ├── module3
│   └── module4
├── platforms
│   └── app-plus
├── static
│   ├── fonts
│   ├── images
├── uni_modules
├── unpackage
├── wxcomponents
│   └── vant
├── App.vue
├── main.js
├── manifest.json
├── package-lock.json
├── package.json
├── pages.json
├── uni.scss

```

## 实现的一些效果

- 三方通用组件：`uni`组件（在 uni_modules 文件夹）和`uView`组件(npm 安装，在 node_modules 文件夹)，图表使用的`lime-echart`，`vant` 只在小程序使用
- ListView 相关
- GridView 相关
- ECharts 相关(多图表异步加载、渐变折线图、折线柱状图混合图表)
- uni 网络请求封装和 api 配置
- 数据缓存
- 全局常量、变量
- 公共样式
- 基类: base-navbar
- 网络监听，设备类型和刘海屏判断
- 封装一些组件(在 `components` 文件夹)和工具类(在 `utils` 文件夹)

<br>
<br>


## 预览

部分页面效果如下：

| <img src="https://gitee.com/iotjh/Picture/raw/master/uniapp/login.gif" width="187" height="419"> | <img src="https://gitee.com/iotjh/Picture/raw/master/uniapp/login.png" width="187" height="419"> | <img src="https://gitee.com/iotjh/Picture/raw/master/uniapp/mine.png" width="187" height="419"> |
| ------ | ------ | ------ |
| <img src="https://gitee.com/iotjh/Picture/raw/master/uniapp/gridView2.jpg" width="187" height="419"> | <img src="https://gitee.com/iotjh/Picture/raw/master/uniapp/gridView3.jpg" width="187" height="419"> | <img src="https://gitee.com/iotjh/Picture/raw/master/uniapp/gridView4.jpg" width="187" height="419"> |
| <img src="https://gitee.com/iotjh/Picture/raw/master/uniapp/listView5.jpg" width="187" height="419"> | <img src="https://gitee.com/iotjh/Picture/raw/master/uniapp/listView6.jpg" width="187" height="419"> | <img src="https://gitee.com/iotjh/Picture/raw/master/uniapp/listView7.jpg" width="187" height="419"> |
| <img src="https://gitee.com/iotjh/Picture/raw/master/uniapp/eCharts3.png" width="187" height="419"> | <img src="https://gitee.com/iotjh/Picture/raw/master/uniapp/eCharts4.png" width="187" height="419"> | <img src="https://gitee.com/iotjh/Picture/raw/master/uniapp/eCharts5.png" width="187" height="419"> |
| <img src="https://gitee.com/iotjh/Picture/raw/master/uniapp/base-navbar.jpg" width="187" height="419"> | <img src="https://gitee.com/iotjh/Picture/raw/master/uniapp/xxx.jpg" width="187" height="419"> | <img src="https://gitee.com/iotjh/Picture/raw/master/uniapp/xxx.jpg" width="187" height="419"> |
