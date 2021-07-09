/* 项目配置


  //单页面导入调用

  import ProjectConfig from '@/common/configs/projectConfig.js'
  const ProjectConfig = require('@/common/configs/projectConfig.js')
  const ProjectConfig = require('../../common/configs/projectConfig.js')
  
  console.log(ProjectConfig.kVersion); 
  
  
  
  //main.js挂载调用
  
  // // 导入js文件
  // import ProjectConfig from './common/configs/projectConfig'
  // // 挂载
  // Vue.prototype.$ProjectConfig = ProjectConfig
  
  // module.exports = {
  // 	kTest: 'kTest123',
  // }
   console.log(this.$ProjectConfig.kTest); 
   
 */


// appName
export const kAppName = 'jh-uniapp-demo';
// 版本号
export const kVersion = '1.0.0';

/********************************* 数据存储 相关的 key ********************************/

// 保存本地的用户信息
export const kUD_UserInfo = 'kUD_UserInfo';
// 上次版本号
export const kUD_LastVersion = 'kUD_LastVersion';
