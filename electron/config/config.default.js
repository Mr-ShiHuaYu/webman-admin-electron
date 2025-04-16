'use strict';

const path = require('path');

const settingConfig = require('./readSetting');
const webmanConfig = settingConfig.webman;

/**
 * 默认配置
 */
module.exports = (appInfo) => {
    let iconPath = path.join(appInfo.home, 'public', 'images', 'logo-32.png');
    if (settingConfig.windowsOption.icon) {
        iconPath = path.join(appInfo.execDir, settingConfig.windowsOption.icon);
    }

    const config = {};

    /**
     * 开发者工具
     */
    config.openDevTools = settingConfig.openDevTools || false;

    /**
     * 应用程序顶部菜单
     */
    config.openAppMenu = settingConfig.openAppMenu || false;

    /**
     * 主窗口
     */
    config.windowsOption = {
        title: settingConfig.windowsOption.title || 'electron webman',
        width: settingConfig.windowsOption.width || 980,
        height: settingConfig.windowsOption.height || 650,
        minWidth: settingConfig.windowsOption.minWidth || 400,
        minHeight: settingConfig.windowsOption.minHeight || 300,
        webPreferences: {
            webSecurity: false,
            contextIsolation: false, // false -> 可在渲染进程中使用electron的api，true->需要bridge.js(contextBridge)
            nodeIntegration: true,
            //preload: path.join(appInfo.baseDir, 'preload', 'bridge.js'),
        },
        frame: true,
        show: false,
        // icon: path.join(appInfo.home, 'public', 'images', 'logo-32.png'),
        icon: iconPath,
    };

    /**
     * ee框架日志
     */
    config.logger = {
        dir: path.join(appInfo.execDir, 'logs'), // 日志目录
        encoding: 'utf8',
        level: settingConfig.logger.level || "INFO",
        outputJSON: false,
        buffer: true,
        enablePerformanceTimer: false,
        rotator:  settingConfig.logger.rotator || 'day',
        appLogName: settingConfig.logger.appLogName || 'ee.log',
        coreLogName: settingConfig.logger.coreLogName || 'ee-core.log',
        errorLogName:settingConfig.logger.errorLogName ||  'ee-error.log'
    }

    /**
     * 远程模式-web地址
     */
    config.remoteUrl = {
        enable: false,
        url: 'http://electron-egg.kaka996.com/'
    };

    /**
     * 内置socket服务
     */
    config.socketServer = {
        enable: false,
        port: 7070,
        path: "/socket.io/",
        connectTimeout: 45000,
        pingTimeout: 30000,
        pingInterval: 25000,
        maxHttpBufferSize: 1e8,
        transports: ["polling", "websocket"],
        cors: {
            origin: true,
        }
    };

    /**
     * 内置http服务
     */
    config.httpServer = {
        enable: false,
        https: {
            enable: false,
            key: '/public/ssl/localhost+1.key',
            cert: '/public/ssl/localhost+1.pem'
        },
        host: '127.0.0.1',
        port: 7071,
        cors: {
            origin: "*"
        },
        body: {
            multipart: true,
            formidable: {
                keepExtensions: true
            }
        },
        filterRequest: {
            uris: [
                'favicon.ico'
            ],
            returnData: ''
        }
    };

    /**
     * 主进程
     * 生产环境
     */
    config.mainServer = {
        protocol: 'file://',
        indexPath: '/public/dist/index.html',
        host: '127.0.0.1',
        port: 7072,
    };
    /**
     * 硬件加速
     */
    config.hardGpu = {
        enable: false
    };

    /**
     * 异常捕获
     */
    config.exception = {
        mainExit: false,
        childExit: true,
        rendererExit: true,
    };

    /**
     * jobs
     */
    config.jobs = {
        messageLog: true
    };

    /**
     * 插件功能
     */
    config.addons = {
        window: {
            enable: true,
        },
        tray: {
            enable: true,
            title: 'EE程序',
            icon: '/public/images/tray.png'
        },
        security: {
            enable: true,
        },
        awaken: {
            enable: true,
            protocol: 'ee',
            args: []
        },
        autoUpdater: {
            enable: false,
            windows: false,
            macOS: false,
            linux: false,
            options: {
                provider: 'generic',
                url: 'http://kodo.qiniu.com/'
            },
            force: false,
        },
        javaServer: {
            enable: false,
            port: 18080,
            jreVersion: 'jre1.8.0_201',
            opt: '-server -Xms512M -Xmx512M -Xss512k -Dspring.profiles.active=prod -Dserver.port=${port} -Dlogging.file.path="${path}" ',
            name: 'java-app.jar'
        },
        webman: webmanConfig
    };

    return {
        ...config
    };
}
