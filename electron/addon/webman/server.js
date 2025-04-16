const fs = require("fs");
const path = require("path");
const {execSync, spawn} = require("child_process");
const Log = require("ee-core/log");
const is = require("ee-core/utils/is");
const UtilsPs = require("ee-core/ps");
const {app: electronApp} = require("electron");

/**
 * java server
 */
class WebmanServer {
    constructor() {
        this.options;
        this.phpProcess;
    }

    /**
     * 创建服务
     */
    async create(cfg) {
        this.options = cfg;
        if (this.options.enable === false) {
            return;
        }
        const hostname = this.options.hostname;

        if (["localhost", "127.0.0.1"].indexOf(hostname) === -1) {
            // 不是localhost就退出，不启动服务
            return;
        }

        try {
            const phpPath = this.options.phpPath;
            const projectPath = this.options.projectPath;
            const stdioIgnore = this.options.stdioIgnore;

            let phpBinaryPath = path.join(
                UtilsPs.getExtraResourcesDir(),
                phpPath);
            Log.info("[addon:webmanServer] phpBinaryPath file path:", phpBinaryPath);

            const windowsPhpPath = path.join(
                UtilsPs.getExtraResourcesDir(),
                projectPath,
                "windows.php"
            );

            Log.info(
                "[addon:webmanServer] windowsPhpPath file path:",
                windowsPhpPath
            );

            if (!fs.existsSync(phpBinaryPath))
                throw new Error("php.exe does not exist");

            if (!fs.existsSync(windowsPhpPath))
                throw new Error("windows.php does not exist");

            const processOption = stdioIgnore === true ? {stdio: "ignore"} : {};
            Log.info("[addon:webmanServer] processOption :", processOption);

            if (is.windows()) {
                this.phpProcess = spawn(phpBinaryPath, [windowsPhpPath], processOption);
                if (!stdioIgnore) {
                    this.phpProcess.stdout.on("data", (data) => {
                        Log.info(`[addon:webmanServer] ${data}`);
                    });
                }

                Log.info("[addon:webmanServer] create webman,pid=", this.phpProcess.pid);

                // kill
                electronApp.on("window-all-closed", async () => {
                    await this.kill();
                });
            } else if (is.macOS()) {
                // todo macos
            } else {
                // todo linux
            }

            // Log.info("[addon:webmanServer] cmdStr:", cmdStr);
            // exec(cmdStr);
        } catch (err) {
            Log.error("[addon:webmanServer] throw error:", err);
        }
    }

    /**
     * 关闭服务
     */
    async kill() {
        if (is.windows()) {
            Log.info("[addon:webmanServer] kill webman,pid=", this.phpProcess.pid);
            execSync(`taskkill /T /F /pid ${this.phpProcess.pid}`);
            electronApp.quit(); // 非 macOS 直接退出
        } else if (is.macOS()) {
            // todo macos
        } else {
            // todo linux
        }
    }
}

module.exports = WebmanServer;
