'use strict';

/**
 * 开发环境配置，覆盖 config.default.js
 */
module.exports = (appInfo) => {
  const config = {};

  /**
   * 开发者工具
   */
  // config.openDevTools = {
  //   mode: 'undocked'
  // };
  config.openDevTools = false;
  /**
   * 应用程序顶部菜单
   */
  config.openAppMenu = false;

  /**
   * jobs
   */
  config.jobs = {
    messageLog: true
  };

  return {
    ...config
  };
};
