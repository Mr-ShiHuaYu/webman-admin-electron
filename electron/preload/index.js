/*************************************************
 ** preload为预加载模块，该文件将会在程序启动时加载 **
 *************************************************/
const Addon = require('ee-core/addon');
const Conf = require("ee-core/config");
/**
 * 预加载模块入口
 */
module.exports = async () => {

    // 已实现的功能模块，可选择性使用和修改
    let trayCfg = Conf.getValue('addons.tray');
    console.log('trayCfg->',trayCfg);
    if (trayCfg.enable === true){
        Addon.get('tray').create();
    }

    Addon.get('security').create();
    Addon.get('awaken').create();
    // Addon.get('autoUpdater').create();

    let webmanCfg = Conf.getValue('addons.webman');
    if (webmanCfg.enable === true) {
        Addon.get('webman').create();
    }
}
