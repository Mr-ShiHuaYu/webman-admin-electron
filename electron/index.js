const {Application} = require('ee-core');
const Log = require('ee-core/log');
const Conf = require("ee-core/config");

class Index extends Application {
    constructor() {
        super();
        // this === eeApp;
    }

    /**
     * core app have been loaded
     */
    async ready() {
        // do some things
    }

    /**
     * electron app ready
     *    * 加载以下事件
     *    * app.on('second-instance')
     *    * app.whenReady().then() 该事件会创建 mainWindow
     *    * app.on('window-all-closed')
     *    * app.on('before-quit')
     *    * 然后触发
     *    * -> electronAppReady()
     */
    async electronAppReady() {
        // do some things
    }

    /**
     * main window have been loaded
     */
    async windowReady() {
        // do some things
        // 延迟加载，无白屏
        const winOpt = this.config.windowsOption;
        if (winOpt.show === false) {
            const win = this.electron.mainWindow;
            win.once('ready-to-show', () => {
                win.show();
                win.focus();

                let webmanCfg = Conf.getValue('addons.webman');
                if (webmanCfg.enable === false) {
                    return;
                }

                win.loadURL(`http://${webmanCfg.hostname}:${webmanCfg.port}`);
            });
        }
    }

    /**
     * before app close
     * 在CoreApp.appQuit();之后调用
     */
    async beforeClose() {
        // do some things
    }
}

Index.toString = () => '[class Index]';
module.exports = Index;
