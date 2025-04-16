const settingConfig = require('./readSetting');
/**
 * 生产环境配置，覆盖 config.default.js
 */
module.exports = (appInfo) => {
    const config = {};

    /**
     * 开发者工具
     */
    // config.openDevTools = {
    //   mode: 'undocked'
    // };
    config.openDevTools = settingConfig.openDevTools || false;

    /**
     * 应用程序顶部菜单
     */
    config.openAppMenu = settingConfig.openAppMenu || false;

    /**
     * jobs
     */
    config.jobs = {
        messageLog: false
    };

    return {
        ...config
    };
};
